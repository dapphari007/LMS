import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { UserRole } from "./User";

@Entity("workflow_levels")
export class WorkflowLevel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int" })
  level: number;

  @Column({ name: "approver_type" })
  approverType: string;

  @Column({ type: "jsonb", name: "fallback_roles" })
  fallbackRoles: UserRole[];

  @Column({ default: true, name: "is_active" })
  isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}