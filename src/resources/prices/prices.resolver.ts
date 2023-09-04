import { Resolver, Query, Args } from '@nestjs/graphql';
import { PricesService } from './prices.service';
import { Price } from './entities/price.entity';

@Resolver('PriceHistory')
export class PricesResolver {
  constructor(private readonly pricesService: PricesService) {
  }

  @Query(() => [Price])
  public async history(@Args('currency') currency: string): Promise<Price[]> {
    return this.pricesService.history(currency);
  }

  @Query(() => Price)
  public async current(@Args('currency') currency: string): Promise<Price> {
    return this.pricesService.current(currency);
  }
}
