import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PCA as PCADomain } from '@/domain/customers/entities/pca.entity';
import { CustomerEntity } from './customer.entity';

@Entity('pcas')
export class PCAEntity implements PCADomain {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  year: number;
  
  @Column()
  estimatedExerciseBudget: number;

  @ManyToOne(() => CustomerEntity, { nullable: true })
  @JoinColumn({ name: 'customerId' }) 
  customer: CustomerEntity;

  @Column()
  customerId: number;
}
