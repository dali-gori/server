import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { Region } from '../regions/region.entity';
import { Report } from '../reports/report.entity';
import { Device } from '../devices/device.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'oper_region_id' })
  operRegionId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'subscription_id' })
  subscriptionId: number;

  @Column({ name: 'payment_number', nullable: true })
  paymentNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Subscription, subscription => subscription.users)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => Region, region => region.users)
  @JoinColumn({ name: 'oper_region_id' })
  operRegion: Region;

  @OneToMany(() => Report, report => report.creator)
  reports: Report[];

  @OneToMany(() => Device, device => device.user)
  devices: Device[];
}
