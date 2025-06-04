import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import ApprovalWorkflowsPage from "./ApprovalWorkflowsPage";
import WorkflowCategoriesPage from "./WorkflowCategoriesPage";

// Tab types
type TabType = "workflows" | "categories";

export default function ApprovalManagementPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get("tab");
  
  // Set initial tab based on URL parameter or default to "workflows"
  const initialTab: TabType = (
    tabParam === "categories"
  ) ? tabParam as TabType : "workflows";
    
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  
  // Update URL when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    navigate(`/approval-management${tab !== "workflows" ? `?tab=${tab}` : ""}`, { replace: true });
  };
  
  // Update tab if URL parameter changes
  useEffect(() => {
    if (tabParam === "categories") {
      setActiveTab(tabParam as TabType);
    } else if (tabParam === null && activeTab !== "workflows") {
      setActiveTab("workflows");
    }
  }, [tabParam, activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "workflows":
        return <ApprovalWorkflowsPage isTabContent={true} />;
      case "categories":
        return <WorkflowCategoriesPage isTabContent={true} />;
      default:
        return <ApprovalWorkflowsPage isTabContent={true} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Approval Management</h1>
        

      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => handleTabChange("workflows")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "workflows"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Workflows
          </button>
          <button
            onClick={() => handleTabChange("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Manage Categories
          </button>
        </nav>
      </div>
      
      {/* Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}