import { Inject, Injectable } from '@nestjs/common';
import { IPCARepository } from '@/domain/customers/repositories/pca.repository.interface'; // Substitua pelo caminho real do seu repositório

interface PCAInput {
  name: string;
  status: string;
  year: number;
  estimatedExerciseBudget: number;
}

@Injectable()
export class CreatePCAUseCase {
  private readonly pcaRepository: IPCARepository;

  constructor(@Inject('IPCARepository') pcaRepository: IPCARepository) {
    this.pcaRepository = pcaRepository;
  }

  public async execute(PCAInput: PCAInput, idCustomer: number): Promise<void> {
    const pcaExists = await this.pcaRepository.findByName(PCAInput.name);
    if (!pcaExists) {
      console.log(idCustomer)
      const pcaData = this.pcaRepository.create(
        PCAInput.name,
        PCAInput.status,
        PCAInput.year,
        PCAInput.estimatedExerciseBudget,
        idCustomer
      );
      await this.pcaRepository.save(pcaData);
    }
  }
}
