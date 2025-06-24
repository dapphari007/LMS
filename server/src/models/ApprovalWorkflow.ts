import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { UserRole } from "./User";
import { WorkflowCategory } from "./WorkflowCategory";
import { Role } from "./Role";

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
    roleIds: string[];            // Role IDs from roles table
    departmentSpecific?: boolean; // Whether approval is department-specific
    required?: boolean;           // Whether this level is required
  }[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => WorkflowCategory, category => category.workflows)
  @JoinColumn({ name: "categoryId" })
  category: WorkflowCategory;

  @Column({ nullable: true })
  requesterRoleId: string;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: "requesterRoleId" })
  requesterRole: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
