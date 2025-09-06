import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { StatusHistory } from '../status-history/status-history.entity';
import { Item } from '../items/item.entity';

@Entity({ name: 'reports' })
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  geo_x: number;

  @Column({ type: 'float' })
  geo_y: number;

  @Column({ type: 'int' })
  radius: number;

  @Column({ name: 'created_by' })
  createdBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.reports)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @OneToMany(() => StatusHistory, statusHistory => statusHistory.report, { onDelete: 'CASCADE' })
  statusHistory: StatusHistory[];

  @OneToMany(() => Item, item => item.report, { onDelete: 'CASCADE' })
  items: Item[];
}
