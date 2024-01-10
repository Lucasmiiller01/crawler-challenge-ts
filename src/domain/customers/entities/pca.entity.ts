
export class PCA {
  constructor(
    public name: string,
    public status: string,
    public year: number,
    public estimatedExerciseBudget: number,
    public customerId?: number,
    public readonly id?: number,

  ) {
  }
}
