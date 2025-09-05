import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn, Index
} from 'typeorm';
import {User} from "../users/user.entity";

@Entity({ name: 'saved_locations' })
export class SavedLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  geo_x: number;

  @Column({ type: 'float' })
  geo_y: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Index()
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => User, user => user.savedLocations, {
    onDelete: 'CASCADE', // delete locations when user is deleted
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
