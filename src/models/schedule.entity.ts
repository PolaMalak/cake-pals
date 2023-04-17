import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Baker } from './baker.entity';
import { Product } from './product.entity';
import { OrderStatusEnum } from 'src/enums/order-status.enum';
import { User } from './user.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: 'datetime', nullable: true })
  collectingTime: Date;

  @ManyToOne(() => Baker, (baker) => baker.schedules, { onDelete: 'CASCADE' })
  baker: Baker;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;

  @ManyToOne(() => Product, (product) => product.schedules, {
    onDelete: 'CASCADE',
  })
  product: Product;
  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;
}
