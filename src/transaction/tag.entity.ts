// tag.entity.ts
import { UserTag } from 'src/user/entities/user-tag.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.userTags)
  users: User[];

  @OneToMany(() => UserTag, (userTag) => userTag.tag)
  userTags: UserTag[];
}
