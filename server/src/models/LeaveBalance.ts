import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { LeaveType } from './LeaveType';

@Entity('leave_balances')
export class LeaveBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.leaveBalances)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => LeaveType, leaveType => leaveType.leaveBalances)
  @JoinColumn({ name: 'leaveTypeId' })
  leaveType: LeaveType;

  @Column()
  leaveTypeId: string;

  @Column({ type: 'decimal', precision: 5, scale: 1, default: 0 })
  balance: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, default: 0 })
  used: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, default: 0 })
  carryForward: number;

  @Column()
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}