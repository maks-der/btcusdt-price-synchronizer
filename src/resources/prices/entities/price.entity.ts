import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Price {
  @Field()
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column({ type: "float" })
  public price: number;

  @Field()
  @Column()
  public currency: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt: Date;

  constructor(
    currency: string,
    price: number,
  ) {
    this.currency = currency;
    this.price = price;
  }
}
