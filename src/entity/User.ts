
import { Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    getRepository,
    OneToOne
  } from 'typeorm';

  import UserProfile from './UserProfile';
  
  @Entity('users', {
    synchronize: false
  })
  
  export default class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Index()
    @Column({ unique: true, length: 255 })
    username!: string;
  
    @Index()
    @Column({ unique: true, length: 255, nullable: true, type: 'varchar' })
    email!: string | null;
  
    @Column('timestampz')
    @CreateDateColumn()
    created_at!: Date;
  
    @Column('timestamptz')
    @UpdateDateColumn()
    updated_at!: Date;
  
    @Column({ default: false })
    is_certified!: boolean;
  
    @OneToOne(type => UserProfile, profile => profile.user)
    profile!: UserProfile;
  
  }
  