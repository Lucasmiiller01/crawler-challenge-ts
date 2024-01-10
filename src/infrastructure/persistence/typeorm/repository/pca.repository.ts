import { Repository } from 'typeorm';
import { PCA } from '@/domain/customers/entities/pca.entity';
import { IPCARepository } from '@/domain/customers/repositories/pca.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PCAEntity } from '@/infrastructure/database/entities/pca.entity';

export class PCARepository implements IPCARepository {
  constructor(
    @InjectRepository(PCAEntity)
    private repository: Repository<PCAEntity>,
  ) {}

  async findByName(name: string): Promise<PCA | null> {
    return this.repository.findOne({ where: { name } });
  }

  async save(customer: PCA): Promise<void> {
    await this.repository.save(customer);
  }

  create(
    name: string,
    status: string,
    year: number,
    estimatedExerciseBudget: number,
    idCustomer: number
  ): PCA {
    const pca = new PCA(name, status, year, estimatedExerciseBudget, idCustomer);
    return pca;
  }
}
