import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;
  
  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;
}
