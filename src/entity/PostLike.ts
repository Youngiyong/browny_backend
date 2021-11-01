import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import Post from './Post';
  
  @Entity('post_likes', {
    synchronize: false,
  })
  export default class PostLike {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column('uuid')
    fk_qna_id!: string;
  
    @Column('uuid')
    fk_user_id!: string;

    @Column('timestampz')
    @CreateDateColumn()
    created_at!: Date;
  
    @ManyToOne((type) => Post, (post) => post.likes)
    @JoinColumn({ name: 'fk_post_id' })
    post!: Post;
  }
  