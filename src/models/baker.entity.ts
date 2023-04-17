import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Baker extends User {
  @OneToMany(() => Product, (product) => product.baker, { cascade: true })
  products: Product[];

  @Column('time')
  startAt: string;

  @Column('time')
  endAt: string;

  @Column({ type: 'int', nullable: true, default: 5 })
  rating: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  rateCount: number;

  @OneToMany(() => Schedule, (schedule) => schedule.baker, { cascade: true })
  schedules: Schedule[];
}
