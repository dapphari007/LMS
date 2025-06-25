import { AppDataSource } from "../config/database";
import { LeaveType, LeaveBalance } from "../models";
import { getCurrentYear } from "../utils/dateUtils";

/**
 * Script to check if leave balances exist for a specific leave type
 * Run with: npx ts-node src/scripts/checkLeaveTypeBalances.ts <leave-type-id> [year]
 */
async function checkLeaveTypeBalances() {
  try {
    // Get the leave type ID and optional year from command line arguments
    const leaveTypeId = process.argv[2];
    const year = process.argv[3] ? parseInt(process.argv[3]) : getCurrentYear();
    
    if (!leaveTypeId) {
      console.error("Please provide a leave type ID as a command line argument");
      process.exit(1);
    }
    
    console.log(`Checking leave balances for leave type ID: ${leaveTypeId}, year: ${year}`);
    
    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connection initialized");
    }
    
    // First check if the leave type exists
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({ where: { id: leaveTypeId } });
    
    if (!leaveType) {
      console.log(`Leave type with ID ${leaveTypeId} not found`);
      
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
      
      await AppDataSource.destroy();
      return;
    }
    
    console.log(`Found leave type: ${leaveType.name}`);
    
    // Check if leave balances exist for this leave type and year
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveBalances = await leaveBalanceRepository.find({
      where: {
        leaveTypeId: leaveTypeId,
        year: year
      },
      relations: ["user"],
      take: 10
    });
    
    console.log(`Found ${leaveBalances.length} leave balances for leave type ${leaveTypeId} and year ${year}`);
    
    if (leaveBalances.length > 0) {
      console.log("Sample leave balances:");
      leaveBalances.forEach(balance => {
        console.log(`- ID: ${balance.id}, User: ${balance.user?.email || 'Unknown'}, Balance: ${balance.balance}, Used: ${balance.used}`);
      });
    } else {
      console.log("No leave balances found for this leave type and year.");
      
      // Check if there are any leave balances in the system
      const totalBalances = await leaveBalanceRepository.count();
      console.log(`Total leave balances in the system: ${totalBalances}`);
      
      if (totalBalances > 0) {
        // Check if there are any leave balances for this leave type (any year)
        const typeBalances = await leaveBalanceRepository.count({
          where: { leaveTypeId: leaveTypeId }
        });
        
        console.log(`Leave balances for this leave type (any year): ${typeBalances}`);
        
        if (typeBalances > 0) {
          const otherYearBalances = await leaveBalanceRepository.find({
            where: { leaveTypeId: leaveTypeId },
            take: 5
          });
          
          console.log("Leave balances for this leave type in other years:");
          otherYearBalances.forEach(balance => {
            console.log(`- Year: ${balance.year}, Balance: ${balance.balance}, Used: ${balance.used}`);
          });
        }
      }
    }
    
    // Close the database connection
    await AppDataSource.destroy();
    
  } catch (error) {
    console.error("Error checking leave type balances:", error);
    process.exit(1);
  }
}

// Run the function
checkLeaveTypeBalances().catch(error => {
  console.error("Unhandled error:", error);
  process.exit(1);
});