import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'fires' })
export class Fire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  geo_y: number;

  @Column('float')
  geo_x: number;

  @Column()
  status: string;

  @Column()
  description: string;
}
