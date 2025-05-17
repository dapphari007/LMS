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

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => WorkflowCategory, category => category.workflows)
  @JoinColumn({ name: "categoryId" })
  category: WorkflowCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
