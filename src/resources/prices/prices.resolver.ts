import { Resolver, Query, Args } from '@nestjs/graphql';
import { PricesService } from './prices.service';
import { Price } from './entities/price.entity';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/graphql-auth.guard';

@Resolver(() => Price)
export class PricesResolver {
  constructor(private readonly pricesService: PricesService) {
  }

  @Query(() => [Price])
  @UseGuards(GraphqlAuthGuard)
  public async history(@Args('currency') currency: string): Promise<Price[]> {
    return this.pricesService.history(currency);
  }

  @Query(() => Price)
  @UseGuards(GraphqlAuthGuard)
  public async current(@Args('currency') currency: string): Promise<Price> {
    return this.pricesService.current(currency);
  }
}
