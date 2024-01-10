import { extractNumbers } from "@/shared/helpers/string.helper";

export class Customer {
  constructor(
    public name: string,
    public cnpj: string,
    public readonly id?: number,
  ) {
    this.cnpj = extractNumbers(this.cnpj);
  }
}
