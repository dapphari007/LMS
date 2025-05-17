import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { LeaveType } from "./LeaveType";

export enum LeaveRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  PARTIALLY_APPROVED = "partially_approved",
  PENDING_DELETION = "pending_deletion",
}

export enum LeaveRequestType {
  FULL_DAY = "full_day",
  HALF_DAY_MORNING = "half_day_morning",
  HALF_DAY_AFTERNOON = "half_day_afternoon",
}

@Entity("leave_requests")
export class LeaveRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.leaveRequests)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => LeaveType, (leaveType) => leaveType.leaveRequests)
  @JoinColumn({ name: "leaveTypeId" })
  leaveType: LeaveType;

  @Column()
  leaveTypeId: string;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({
    type: "enum",
    enum: LeaveRequestType,
    enumName: "leave_request_type_enum",
    default: LeaveRequestType.FULL_DAY,
  })
  requestType: LeaveRequestType;

  @Column({ type: "decimal", precision: 5, scale: 1 })
  numberOfDays: number;

  @Column({ type: "text" })
  reason: string;

  @Column({
    type: "enum",
    enum: LeaveRequestStatus,
    enumName: "leave_request_status_enum",
    default: LeaveRequestStatus.PENDING,
  })
  status: LeaveRequestStatus;

  @ManyToOne(() => User, (user) => user.approvedLeaveRequests, {
    nullable: true,
  })
  @JoinColumn({ name: "approverId" })
  approver: User;

  @Column({ nullable: true })
  approverId: string;

  @Column({ type: "text", nullable: true })
  approverComments: string;

  @Column({ nullable: true })
  approvedAt: Date;

  @Column({ type: "jsonb", nullable: true })
  metadata: {
    currentApprovalLevel?: number;
    requiredApprovalLevels?: number[];
    isFullyApproved?: boolean;
    approvalHistory?: {
      level: number;
      approverId: string;
      approverName: string;
      approvedAt: Date;
      comments?: string;
    }[];
    // Deletion request metadata
    originalStatus?: string;
    deletionRequestedBy?: string;
    deletionRequestedAt?: Date;
    deletionRejectedBy?: string;
    deletionRejectedAt?: Date;
    deletionRejectionComments?: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
