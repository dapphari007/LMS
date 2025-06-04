import { AppDataSource } from "../config/database";
import { LeaveType } from "../models";
import logger from "../utils/logger";

/**
 * Script to check if a leave type exists in the database
 * Run with: npx ts-node src/scripts/checkLeaveType.ts <leave-type-id>
 */
async function checkLeaveType() {
  try {
    // Get the leave type ID from command line arguments
    const leaveTypeId = process.argv[2];
    
    if (!leaveTypeId) {
      console.error("Please provide a leave type ID as a command line argument");
      process.exit(1);
    }
    
    console.log(`Checking for leave type with ID: ${leaveTypeId}`);
    
    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connection initialized");
    }
    
    // Check if the leave type exists
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({ where: { id: leaveTypeId } });
    
    if (leaveType) {
      console.log("Leave type found:");
      console.log({
        id: leaveType.id,
        name: leaveType.name,
        description: leaveType.description,
        defaultDays: leaveType.defaultDays,
        isActive: leaveType.isActive,
        createdAt: leaveType.createdAt,
        updatedAt: leaveType.updatedAt
      });
    } else {
      console.log(`No leave type found with ID: ${leaveTypeId}`);
      
      // Check if any leave types exist
      const allLeaveTypes = await leaveTypeRepository.find({ take: 5 });
      
      if (allLeaveTypes.length > 0) {
        console.log(`Found ${allLeaveTypes.length} other leave types. Here are the first 5:`);
        allLeaveTypes.forEach(lt => {
          console.log(`- ${lt.id}: ${lt.name}`);
        });
      } else {
        console.log("No leave types found in the database.");
      }
    }
    
    // Close the database connection
    await AppDataSource.destroy();
    
  } catch (error) {
    console.error("Error checking leave type:", error);
    process.exit(1);
  }
}

// Run the function
checkLeaveType().catch(error => {
  console.error("Unhandled error:", error);
  process.exit(1);
});