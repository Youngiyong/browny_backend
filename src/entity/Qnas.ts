import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
  } from 'typeorm';
import QnaAggregation from './QnaAggregation';
import QnaComment from './QnaComment';
import QnaLike from './QnaLike';
import QnaTag from './QnaTag';
  
  @Entity('qnas', {
    synchronize: false,
  })
  export default class Qna {

    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column({ length: 255 })
    title!: string;
    
    @Column('uuid')
    fk_user_id!: string;

    @Column('text')
    text!: string;

    @Column({ default: false })
    is_private!: boolean;

    @Column({ default: false })
    is_markdown!: boolean;
    
    @Column({ default: false })
    is_temp!: boolean;

    @Column('timestampz')
    @CreateDateColumn()
    created_at!: Date;

    @Column('timestamptz')
    @UpdateDateColumn()
    updated_at!: Date;

    @Column('timestamptz')
    deleted_at!: Date;

    @OneToOne(type => QnaAggregation, aggregations => aggregations.qna)
    aggregations!: QnaAggregation;

    @OneToMany(type =>QnaTag, tags => tags.qna)
    tags!: QnaTag[];

    @OneToMany(type =>QnaLike, likes => likes.qna)
    likes!: QnaLike[];

    @OneToMany(type =>QnaComment, comments => comments.qna)
    comments!: QnaComment[];
  }
  