import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { LeaveRequest } from "./LeaveRequest";
import { LeaveBalance } from "./LeaveBalance";
import { Gender } from "./User";

@Entity("leave_types")
export class LeaveType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  defaultDays: number;

  @Column({ default: false })
  isCarryForward: boolean;

  @Column({ default: 0 })
  maxCarryForwardDays: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    nullable: true,
    type: "varchar",
  })
  applicableGender: string | null;

  @Column({ default: false })
  isHalfDayAllowed: boolean;

  @Column({ default: false })
  isPaidLeave: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.leaveType)
  leaveRequests: LeaveRequest[];

  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.leaveType)
  leaveBalances: LeaveBalance[];
}
