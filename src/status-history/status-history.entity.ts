import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Report } from '../reports/report.entity';
import { ReportStatus } from '../report-statuses/report-status.entity';

@Entity({ name: 'status_history' })
export class StatusHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'status_id' })
  statusId: number;

  @Column({ name: 'report_id' })
  reportId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => ReportStatus, reportStatus => reportStatus.statusHistory)
  @JoinColumn({ name: 'status_id' })
  reportStatus: ReportStatus;

  @ManyToOne(() => Report, report => report.statusHistory)
  @JoinColumn({ name: 'report_id' })
  report: Report;
}
