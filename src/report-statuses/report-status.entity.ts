import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { StatusHistory } from '../status-history/status-history.entity';

@Entity({ name: 'report_statuses' })
export class ReportStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @OneToMany(() => StatusHistory, statusHistory => statusHistory.reportStatus)
  statusHistory: StatusHistory[];
}
