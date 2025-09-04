import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from '../items/item.entity';
import { ItemStatus } from '../item-statuses/item-status.entity';

@Entity({ name: 'item_donations' })
export class ItemDonation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'item_id' })
  itemId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column()
  names: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'status_id' })
  statusId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Item, item => item.donations)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => ItemStatus, itemStatus => itemStatus.donations)
  @JoinColumn({ name: 'status_id' })
  status: ItemStatus;
}
