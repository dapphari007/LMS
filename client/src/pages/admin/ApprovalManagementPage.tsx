import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ApprovalWorkflowsPage from "./ApprovalWorkflowsPage";
import WorkflowCategoriesPage from "./WorkflowCategoriesPage";
import ApproverTypesPage from "./ApproverTypesPage";
import WorkflowLevelsConfig from "../../components/admin/WorkflowLevelsConfig";

type TabType = "workflows" | "categories" | "approverTypes" | "levels";

export default function ApprovalManagementPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tabParam = searchParams.get("tab");
  
  // Set initial tab based on URL parameter or default to "workflows"
  const initialTab: TabType = (tabParam === "categories" || tabParam === "approverTypes" || tabParam === "levels") 
    ? tabParam as TabType
    : "workflows";
    
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  
  // Update URL when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    navigate(`/approval-management${tab !== "workflows" ? `?tab=${tab}` : ""}`, { replace: true });
  };
  
  // Update tab if URL parameter changes
  useEffect(() => {
    if (tabParam === "categories" || tabParam === "approverTypes" || tabParam === "levels") {
      setActiveTab(tabParam as TabType);
    } else if (tabParam === null && activeTab !== "workflows") {
      setActiveTab("workflows");
    }
  }, [tabParam, activeTab]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Approval Management</h1>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => handleTabChange("workflows")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "workflows"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Approval Workflows
          </button>
          <button
            onClick={() => handleTabChange("levels")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "levels"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Workflow Levels
          </button>
          <button
            onClick={() => handleTabChange("categories")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Workflow Categories
          </button>
          <button
            onClick={() => handleTabChange("approverTypes")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "approverTypes"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Approver Types
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "workflows" && <ApprovalWorkflowsPage isTabContent={true} />}
        {activeTab === "levels" && <WorkflowLevelsConfig isTabContent={true} />}
        {activeTab === "categories" && <WorkflowCategoriesPage isTabContent={true} />}
        {activeTab === "approverTypes" && <ApproverTypesPage isTabContent={true} />}
      </div>
    </div>
  );
}