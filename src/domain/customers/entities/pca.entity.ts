import { Customer } from "./customer.entity";

export class PCA {
  public readonly id?: number;
  public customer: Customer;

  constructor(
    public name: string,
    public status: string,
    public year: number,
    public estimatedExerciseBudget: number,
    public customerId?: number,

  ) {
  }
}
