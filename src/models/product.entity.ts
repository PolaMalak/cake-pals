import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Baker } from './baker.entity';
import { EntityBase } from './base';
import { Schedule } from './schedule.entity';

@Entity()
export class Product extends EntityBase {
  @Column('varchar', { length: 255, nullable: false })
  type: string;

  @Column({ type: 'time', nullable: true })
  bakingTime: string;

  @ManyToOne(() => Baker, (baker) => baker.products, { onDelete: 'CASCADE' })
  baker: Baker;

  @OneToMany(() => Schedule, (schedule) => schedule.product, { cascade: true })
  schedules: Schedule[];
}
