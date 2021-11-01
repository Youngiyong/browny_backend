import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from './User';
import PostComment from './PostComment';
import PostTag from './PostTag';
import PostLike from './PostLike';

@Entity('posts', {
  synchronize: false,
})
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column('text')
  text!: string;

  @Column({ length: 255, nullable: true, type: 'varchar' })
  thumbnail!: string | null;

  @Column({ default: false })
  is_markdown!: boolean;
  
  @Column({ default: false })
  is_temp!: boolean;

  @Column({ default: false })
  is_private!: boolean;

  @OneToOne((type) => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'fk_user_id' })
  user!: User;

  @Column('uuid')
  fk_user_id!: string;

  @Column()
  likes!: number;

  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @Column('timestamptz')
  deleted_at!: Date;

  @OneToMany(type =>PostTag, tags => tags.post)
  tags!: PostTag[];

  @OneToMany(type =>PostLike, post_likes => post_likes.post)
  post_likes!: PostLike[];

  @OneToMany(type =>PostComment, comments => comments.post)
  comments!: PostComment[];
}
