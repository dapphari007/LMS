import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { ApprovalWorkflow } from "./ApprovalWorkflow";

@Entity("workflow_categories")
export class WorkflowCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "float" })
  minDays: number;

  @Column({ type: "float" })
  maxDays: number;
  
  @Column({ type: "int", default: 3 })
  maxSteps: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ApprovalWorkflow, workflow => workflow.category)
  workflows: ApprovalWorkflow[];
}