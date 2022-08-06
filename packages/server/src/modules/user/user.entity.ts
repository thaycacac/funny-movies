import { MovieEntity } from './../movie/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { pick } from 'lodash';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
    length: 255,
  })
  email: string;

  @Column({
    nullable: false,
    length: 255,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  safeResponse() {
    return pick(this, ['email']);
  }
}
