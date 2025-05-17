import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Dashboard",
      href: user?.role === "super_admin" ? "/super-admin-dashboard" : "/",
      icon: HomeIcon,
    },
    { name: "My Leaves", href: "/my-leaves", icon: CalendarIcon },
    {
      name: "Apply Leave",
      href: "/apply-leave",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Leave Calendar",
      href: "/leave-calendar",
      icon: CalendarDaysIcon,
    },
  ];

  // Additional navigation items for managers, team leads, HR, and admins
  const managerNavigation = [
    { name: "Team Leaves", href: "/team-leaves", icon: UserGroupIcon },
    { name: "Leave Calendar", href: "/leave-calendar", icon: CalendarDaysIcon },
  ];

  const teamLeadNavigation = [
    { name: "Team Leaves", href: "/team-leaves", icon: UserGroupIcon },
    { name: "Leave Calendar", href: "/leave-calendar", icon: CalendarDaysIcon },
  ];

  const hrNavigation = [
    { name: "Team Leaves", href: "/team-leaves", icon: UserGroupIcon },
    { name: "Leave Calendar", href: "/leave-calendar", icon: CalendarDaysIcon },
    {
      name: "Leave Balances",
      href: "/leave-balances",
      icon: ClipboardDocumentListIcon,
    },
  ];

  const adminNavigation = [
    { name: "Users", href: "/users", icon: UserGroupIcon },
    {
      name: "Leave Types",
      href: "/leave-types",
      icon: ClipboardDocumentListIcon,
    },
    { name: "Holidays", href: "/holidays", icon: CalendarDaysIcon },
    {
      name: "Leave Balances",
      href: "/leave-balances",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Approval Workflows",
      href: "/approval-workflows",
      icon: UserGroupIcon,
    },
  ];

  // Super admin navigation
  const superAdminNavigation = [
    { name: "Users", href: "/users", icon: UserGroupIcon },
    {
      name: "Leave Types",
      href: "/leave-types",
      icon: ClipboardDocumentListIcon,
    },
    { name: "Holidays", href: "/holidays", icon: CalendarDaysIcon },
    { name: "Leave Calendar", href: "/leave-calendar", icon: CalendarDaysIcon },
    {
      name: "Leave Balances",
      href: "/leave-balances",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Approval Workflows",
      href: "/approval-workflows",
      icon: UserGroupIcon,
    },
    { name: "Roles", href: "/roles", icon: UserGroupIcon },
    { name: "Departments", href: "/departments", icon: BuildingOfficeIcon },
    { name: "Positions", href: "/positions", icon: BriefcaseIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="flex flex-shrink-0 items-center px-4">
                <h1 className="text-xl font-bold text-primary-600">
                  Leave Management
                </h1>
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-primary-100 text-primary-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-4 h-6 w-6 flex-shrink-0 ${
                          isActive(item.href)
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}

                  {user?.role === "manager" &&
                    managerNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive(item.href)
                            ? "bg-primary-100 text-primary-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon
                          className={`mr-4 h-6 w-6 flex-shrink-0 ${
                            isActive(item.href)
                              ? "text-primary-600"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}

                  {user?.role === "team_lead" &&
                    teamLeadNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive(item.href)
                            ? "bg-primary-100 text-primary-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon
                          className={`mr-4 h-6 w-6 flex-shrink-0 ${
                            isActive(item.href)
                              ? "text-primary-600"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}

                  {user?.role === "hr" &&
                    hrNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive(item.href)
                            ? "bg-primary-100 text-primary-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon
                          className={`mr-4 h-6 w-6 flex-shrink-0 ${
                            isActive(item.href)
                              ? "text-primary-600"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}

                  {user?.role === "admin" &&
                    adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive(item.href)
                            ? "bg-primary-100 text-primary-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon
                          className={`mr-4 h-6 w-6 flex-shrink-0 ${
                            isActive(item.href)
                              ? "text-primary-600"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}

                  {user?.role === "super_admin" &&
                    superAdminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive(item.href)
                            ? "bg-primary-100 text-primary-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon
                          className={`mr-4 h-6 w-6 flex-shrink-0 ${
                            isActive(item.href)
                              ? "text-primary-600"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-primary-600">
              Leave Management
            </h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive(item.href)
                        ? "text-primary-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}

              {user?.role === "manager" && (
                <>
                  <div className="mt-8 mb-2 px-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Manager
                    </h3>
                  </div>
                  {managerNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-primary-100 text-primary-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive(item.href)
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}

              {user?.role === "team_lead" && (
                <>
                  <div className="mt-8 mb-2 px-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Team Lead
                    </h3>
                  </div>
                  {teamLeadNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-primary-100 text-primary-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive(item.href)
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}

              {user?.role === "hr" && (
                <>
                  <div className="mt-8 mb-2 px-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      HR
                    </h3>
                  </div>
                  {hrNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-primary-100 text-primary-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive(item.href)
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}

              {user?.role === "admin" && (
                <>
                  <div className="mt-8 mb-2 px-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Administration
                    </h3>
                  </div>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-primary-100 text-primary-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive(item.href)
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}

              {user?.role === "super_admin" && (
                <>
                  <div className="mt-8 mb-2 px-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Super Administration
                    </h3>
                  </div>
                  {superAdminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-primary-100 text-primary-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive(item.href)
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1"></div>
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                to="/profile"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 mr-4"
              >
                <UserIcon className="mr-1 h-5 w-5" />
                Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                <ArrowRightOnRectangleIcon className="mr-1 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
