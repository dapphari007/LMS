import { initializeDatabase } from "../config/database";
import { getAllWorkflowCategories } from "../services/workflowCategoryService";
import { getAllApproverTypes } from "../services/approverTypeService";

async function showWorkflowCategories() {
  try {
    // Initialize database connection
    await initializeDatabase();
    console.log("Database connected successfully");

    // Get all workflow categories
    const categories = await getAllWorkflowCategories({});
    
    console.log("\n=== Workflow Categories ===");
    if (categories.length === 0) {
      console.log("No workflow categories found");
    } else {
      categories.forEach((category) => {
        console.log(`ID: ${category.id}`);
        console.log(`Name: ${category.name}`);
        console.log(`Description: ${category.description || "N/A"}`);
        console.log(`Min Days: ${category.minDays}`);
        console.log(`Max Days: ${category.maxDays}`);
        console.log(`Active: ${category.isActive ? "Yes" : "No"}`);
        console.log(`Created At: ${new Date(category.createdAt).toLocaleString()}`);
        console.log(`Updated At: ${new Date(category.updatedAt).toLocaleString()}`);
        console.log("----------------------------");
      });
    }

    // Get all approver types
    const approverTypes = await getAllApproverTypes({});
    
    console.log("\n=== Approver Types ===");
    if (approverTypes.length === 0) {
      console.log("No approver types found");
    } else {
      approverTypes.forEach((type) => {
        console.log(`ID: ${type.id}`);
        console.log(`Name: ${type.name}`);
        console.log(`Code: ${type.code}`);
        console.log(`Description: ${type.description || "N/A"}`);
        console.log(`Active: ${type.isActive ? "Yes" : "No"}`);
        console.log(`Created At: ${new Date(type.createdAt).toLocaleString()}`);
        console.log(`Updated At: ${new Date(type.updatedAt).toLocaleString()}`);
        console.log("----------------------------");
      });
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the function
showWorkflowCategories();