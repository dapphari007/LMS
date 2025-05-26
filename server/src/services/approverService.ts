import { AppDataSource } from "../config/database";
import { User, UserRole } from "../models";
import logger from "../utils/logger";
import { ensureDatabaseConnection } from "../config/database";

/**
 * Find the appropriate approver for a user based on the approver type
 * @param userId The ID of the user requesting leave
 * @param approverType The type of approver to find (teamLead, manager, hr, superAdmin, departmentHead)
 * @returns The approver user object or null if not found
 */
export const findApproverByType = async (
  userId: string,
  approverType: string
): Promise<User | null> => {
  try {
    // Ensure database connection is established
    await ensureDatabaseConnection();

    const userRepository = AppDataSource.getRepository(User);
    
    // Get the user with their department and role
    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      logger.error(`User not found with ID: ${userId}`);
      return null;
    }

    let approver: User | null = null;

    // Find the appropriate approver based on the type
    switch (approverType) {
      case "teamLead":
        // If the user is a Team Lead themselves, we should skip this level
        // and return null to indicate that this level should be skipped
        if (user.role === UserRole.TEAM_LEAD) {
          logger.info(`User ${userId} is a Team Lead, skipping Team Lead approval level`);
          return null;
        }
        
        if (user.teamLeadId) {
          approver = await userRepository.findOne({
            where: { id: user.teamLeadId, isActive: true },
          });
        }
        break;
      
      case "manager":
        // If the user is a Manager themselves, we should skip this level
        if (user.role === UserRole.MANAGER) {
          logger.info(`User ${userId} is a Manager, skipping Manager approval level`);
          return null;
        }
        
        if (user.managerId) {
          approver = await userRepository.findOne({
            where: { id: user.managerId, isActive: true },
          });
        }
        break;
      
      case "hr":
        // If the user is HR themselves, we should skip this level
        if (user.role === UserRole.HR) {
          logger.info(`User ${userId} is HR, skipping HR approval level`);
          return null;
        }
        
        if (user.hrId) {
          approver = await userRepository.findOne({
            where: { id: user.hrId, isActive: true },
          });
        } else {
          // If no specific HR is assigned, find an HR from the same department
          approver = await userRepository.findOne({
            where: { 
              role: UserRole.HR, 
              isActive: true,
              department: user.department 
            },
          });
        }
        break;
      
      case "departmentHead":
        // If the user is a Department Head themselves, we should skip this level
        if (user.role === UserRole.MANAGER && user.department) {
          // Check if they are the department head for their own department
          const isDepartmentHead = await userRepository.count({
            where: {
              role: UserRole.MANAGER,
              department: user.department,
              id: user.id
            }
          }) > 0;
          
          if (isDepartmentHead) {
            logger.info(`User ${userId} is a Department Head, skipping Department Head approval level`);
            return null;
          }
        }
        
        // Find a manager who is assigned to this department
        if (user.department) {
          // First try to find a manager specifically assigned to this department
          const departmentManagers = await userRepository.find({
            where: { 
              role: UserRole.MANAGER, 
              isActive: true,
              department: user.department 
            },
          });
          
          if (departmentManagers.length > 0) {
            // If multiple managers, take the first one
            approver = departmentManagers[0];
          }
        }
        break;
      
      case "superAdmin":
        // If the user is a Super Admin themselves, we should skip this level
        if (user.role === UserRole.SUPER_ADMIN) {
          logger.info(`User ${userId} is a Super Admin, skipping Super Admin approval level`);
          return null;
        }
        
        // Find any active super admin
        approver = await userRepository.findOne({
          where: { role: UserRole.SUPER_ADMIN, isActive: true },
        });
        break;
      
      default:
        logger.error(`Unknown approver type: ${approverType}`);
        break;
    }

    return approver;
  } catch (error) {
    logger.error(`Error in findApproverByType: ${error}`);
    return null;
  }
};

/**
 * Find potential approvers based on fallback roles
 * @param fallbackRoles Array of roles to search for
 * @param departmentId Optional department ID to filter approvers by department
 * @returns Array of users with the specified roles
 */
export const findApproversByRoles = async (
  fallbackRoles: UserRole[],
  departmentId?: string
): Promise<User[]> => {
  try {
    // Ensure database connection is established
    await ensureDatabaseConnection();

    const userRepository = AppDataSource.getRepository(User);
    
    let approvers: User[] = [];
    
    if (departmentId) {
      // First try to find approvers from the same department
      approvers = await userRepository.find({
        where: fallbackRoles.map(role => ({ 
          role, 
          isActive: true,
          department: departmentId
        })),
      });
      
      // If no department-specific approvers found, fall back to any approver with the role
      if (approvers.length === 0) {
        approvers = await userRepository.find({
          where: fallbackRoles.map(role => ({ role, isActive: true })),
        });
      }
    } else {
      // If no department specified, find any approver with the role
      approvers = await userRepository.find({
        where: fallbackRoles.map(role => ({ role, isActive: true })),
      });
    }

    return approvers;
  } catch (error) {
    logger.error(`Error in findApproversByRoles: ${error}`);
    return [];
  }
};

/**
 * Get all potential approvers for a specific level in the approval workflow
 * @param userId The ID of the user requesting leave
 * @param approvalLevel The approval level configuration
 * @returns Array of potential approvers
 */
export const getPotentialApprovers = async (
  userId: string,
  approvalLevel: any
): Promise<User[]> => {
  try {
    // Get the user to determine their department
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      logger.error(`User not found with ID: ${userId}`);
      return [];
    }

    // First try to find the specific assigned approver
    const assignedApprover = await findApproverByType(userId, approvalLevel.approverType);
    
    if (assignedApprover) {
      return [assignedApprover];
    }
    
    // If no assigned approver is found, fall back to role-based approvers
    if (approvalLevel.fallbackRoles && approvalLevel.fallbackRoles.length > 0) {
      // Pass the user's department to find department-specific approvers first
      return await findApproversByRoles(approvalLevel.fallbackRoles, user.department);
    }
    
    return [];
  } catch (error) {
    logger.error(`Error in getPotentialApprovers: ${error}`);
    return [];
  }
};

/**
 * Check if an approver is authorized to approve a leave request based on department and role
 * @param approverId The ID of the approver
 * @param userId The ID of the user requesting leave
 * @returns Object with isAuthorized flag and reason
 */
export const isApproverAuthorized = async (
  approverId: string,
  userId: string
): Promise<{ isAuthorized: boolean; reason?: string }> => {
  try {
    // Ensure database connection is established
    await ensureDatabaseConnection();

    const userRepository = AppDataSource.getRepository(User);
    
    // Get both the approver and the user
    const [approver, user] = await Promise.all([
      userRepository.findOne({ where: { id: approverId } }),
      userRepository.findOne({ where: { id: userId } })
    ]);

    if (!approver) {
      return { isAuthorized: false, reason: "Approver not found" };
    }

    if (!user) {
      return { isAuthorized: false, reason: "User not found" };
    }

    // Prevent self-approval
    if (approverId === userId) {
      return { isAuthorized: false, reason: "You cannot approve your own leave request" };
    }

    // Super admins can approve any leave request
    if (approver.role === UserRole.SUPER_ADMIN) {
      return { isAuthorized: true };
    }

    // Check if the approver is the user's assigned manager, team lead, or HR
    const isAssignedManager = user.managerId === approverId;
    const isAssignedTeamLead = user.teamLeadId === approverId;
    const isAssignedHR = user.hrId === approverId;

    if (isAssignedManager || isAssignedTeamLead || isAssignedHR) {
      return { isAuthorized: true };
    }

    // Check if the approver is from the same department
    const isSameDepartment = approver.department === user.department && user.department !== null;

    // Special case for Team Leads applying for leave
    if (user.role === UserRole.TEAM_LEAD) {
      // Managers can approve Team Lead requests
      if (approver.role === UserRole.MANAGER && isSameDepartment) {
        return { isAuthorized: true };
      }
      
      // Department heads can approve Team Lead requests
      if (approver.role === UserRole.MANAGER && approver.department === user.department) {
        return { isAuthorized: true };
      }
    }

    // HR can approve for their department
    if (approver.role === UserRole.HR && isSameDepartment) {
      return { isAuthorized: true };
    }

    // Managers can approve for their department
    if (approver.role === UserRole.MANAGER && isSameDepartment) {
      return { isAuthorized: true };
    }

    // Team leads can approve for their department
    if (approver.role === UserRole.TEAM_LEAD && isSameDepartment) {
      // Team leads should not approve for other team leads
      if (user.role === UserRole.TEAM_LEAD) {
        return { 
          isAuthorized: false, 
          reason: "Team leads cannot approve leave requests for other team leads" 
        };
      }
      return { isAuthorized: true };
    }

    // If we get here, the approver is not authorized
    return { 
      isAuthorized: false, 
      reason: "You are not authorized to approve leave requests for this department" 
    };
  } catch (error) {
    logger.error(`Error in isApproverAuthorized: ${error}`);
    return { isAuthorized: false, reason: "An error occurred while checking authorization" };
  }
};