import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "./User";

@Entity("approval_workflows")
export class ApprovalWorkflow {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "float" })
  minDays: number;

  @Column({ type: "float" })
  maxDays: number;

  @Column({ type: "jsonb" })
  approvalLevels: {
    level: number;
    roles?: UserRole[];
    approverType?: string;
    fallbackRoles?: UserRole[];
    departmentSpecific?: boolean;
  }[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
