// user-tag.entity.ts
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Tag } from 'src/transaction/tag.entity';

@Entity()
export class UserTag {
  @ManyToOne(() => User, (user) => user.userTags)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Tag, (tag) => tag.userTags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
