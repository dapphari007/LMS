import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";

export enum DashboardType {
  EMPLOYEE = "employee",
  MANAGER = "manager",
  HR = "hr",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  permissions: string;

  @Column({ default: false })
  isSystem: boolean;

  @Column({
    type: "enum",
    enum: DashboardType,
    default: DashboardType.EMPLOYEE,
    nullable: true
  })
  dashboardType: DashboardType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.roleObj)
  users: User[];
}
