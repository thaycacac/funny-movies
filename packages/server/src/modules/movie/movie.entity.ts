import { UserEntity } from './../user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  url: string;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  likeBy: UserEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable()
  dislikeBy: UserEntity[];

  @OneToOne(() => UserEntity)
  @JoinColumn()
  createdBy: UserEntity;
}
