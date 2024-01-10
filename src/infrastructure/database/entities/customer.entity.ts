import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer as CustomerDomain } from '@/domain/customers/entities/customer.entity';
import { PCAEntity } from './pca.entity';

@Entity('customers')
export class CustomerEntity implements CustomerDomain {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @OneToMany(() => PCAEntity, pca => pca.customer)
  pcas: PCAEntity[];
}
