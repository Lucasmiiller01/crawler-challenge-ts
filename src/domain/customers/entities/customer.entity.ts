import { extractNumbers } from "@/shared/helpers/string.helper";
import { PCA } from "./pca.entity";

export class Customer {
  public readonly id?: number;
  public pcas?: PCA[];
  constructor(
    public name: string,
    public cnpj: string,

  ) {
    this.cnpj = extractNumbers(this.cnpj);
  }
}
