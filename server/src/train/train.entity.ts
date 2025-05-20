import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;
}
