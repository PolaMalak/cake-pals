import { BeforeInsert, Column, Entity, OneToMany, Unique } from 'typeorm';
import { EntityBase } from './base';
import hash from '../helpers/hash';
import { Schedule } from './schedule.entity';

@Entity()
export class User extends EntityBase {
  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('varchar', { length: 255, nullable: true, select: false })
  password: string;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  @BeforeInsert()
  async onCreateUser() {
    console.log(this);
    this.email = this.email.trim().toLowerCase();
    this.password = hash(this.password);
  }
}
