import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  AfterLoad,
} from "typeorm";
import { LeaveRequest } from "./LeaveRequest";
import { LeaveBalance } from "./LeaveBalance";
import { Role, DashboardType } from "./Role";
import { Department } from "./Department";
import { Position } from "./Position";

// Keep the enum for backward compatibility and migration
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  MANAGER = "manager",
  HR = "hr",
  TEAM_LEAD = "team_lead",
  EMPLOYEE = "employee",
}

export enum UserLevel {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  // Keep the enum column for backward compatibility
  @Column({
    type: "enum",
    enum: UserRole,
    enumName: "user_role_enum",
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @Column({
    type: "enum",
    enum: UserLevel,
    enumName: "user_level_enum",
    default: UserLevel.LEVEL_1,
  })
  level: UserLevel;

  @Column({
    type: "enum",
    enum: Gender,
    enumName: "gender_enum",
    nullable: true,
  })
  gender: Gender;

  @Column({ nullable: true })
  managerId: string;

  @Column({ nullable: true })
  hrId: string;

  @Column({ nullable: true })
  teamLeadId: string;

  // Keep the string column for backward compatibility
  @Column({ nullable: true, length: 100 })
  department: string;

  // Keep the string column for backward compatibility
  @Column({ nullable: true, length: 100 })
  position: string;

  // Relationship columns added in migration - all nullable
  @Column({ nullable: true })
  roleId?: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  @JoinColumn({ name: "roleId" })
  roleObj?: Role;

  @Column({ nullable: true })
  departmentId?: string;

  @ManyToOne(() => Department, (department) => department.users, {
    nullable: true,
  })
  @JoinColumn({ name: "departmentId" })
  departmentObj?: Department;

  @Column({ nullable: true })
  positionId?: string;

  @ManyToOne(() => Position, (position) => position.users, { nullable: true })
  @JoinColumn({ name: "positionId" })
  positionObj?: Position;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.user)
  leaveRequests: LeaveRequest[];

  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.approver)
  approvedLeaveRequests: LeaveRequest[];

  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.user)
  leaveBalances: LeaveBalance[];

  // Virtual property for dashboard type
  dashboardType: DashboardType;

  @AfterLoad()
  setDashboardType() {
    // Set dashboard type based on role object if available, otherwise use default based on role
    if (this.roleObj && this.roleObj.dashboardType) {
      this.dashboardType = this.roleObj.dashboardType;
    } else {
      // Default mapping based on role
      switch (this.role) {
        case UserRole.SUPER_ADMIN:
          this.dashboardType = DashboardType.SUPER_ADMIN;
          break;
        case UserRole.HR:
          this.dashboardType = DashboardType.HR;
          break;
        case UserRole.MANAGER:
        case UserRole.TEAM_LEAD:
          this.dashboardType = DashboardType.MANAGER;
          break;
        default:
          this.dashboardType = DashboardType.EMPLOYEE;
      }
    }
  }
}
