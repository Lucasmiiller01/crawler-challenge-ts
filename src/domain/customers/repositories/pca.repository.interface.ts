import { PCA } from '../entities/pca.entity';

export interface IPCARepository {
  findByName(name: string): Promise<PCA | null>;
  save(pca: PCA): Promise<void>;
  create(name: string, status: string, year: number, estimatedExerciseBudget: number): PCA;
}
