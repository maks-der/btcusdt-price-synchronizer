export class CreatePriceDto {
  constructor(
    public currency: string,
    public price: number,
  ) {
  }
}
