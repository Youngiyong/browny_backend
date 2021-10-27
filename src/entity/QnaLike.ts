import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import Qna from './Qnas';
  
  @Entity('qna_likes', {
    synchronize: false,
  })
  export default class QnaLike {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column('uuid')
    fk_qna_id!: string;
  
    @Column('uuid')
    fk_user_id!: string;

    @Column('timestampz')
    @CreateDateColumn()
    created_at!: Date;
  
    @ManyToOne((type) => Qna, (qna) => qna.likes)
    @JoinColumn({ name: 'fk_qna_id' })
    qna!: Qna;
  }
  