import { Resolver, Query, Args } from '@nestjs/graphql';
import { BtcusdtPriceHistoryService } from './btcusdt-price-history.service';
import { BtcusdtPriceHistory } from './entities/btcusdt-price-history.entity';

@Resolver('BtcusdtPriceHistory')
export class BtcusdtPriceHistoryResolver {
  constructor(private readonly btcusdtPriceHistoryService: BtcusdtPriceHistoryService) {
  }

  @Query(() => [BtcusdtPriceHistory])
  public async findAll(): Promise<BtcusdtPriceHistory[]> {
    return this.btcusdtPriceHistoryService.findAll();
  }

  @Query(() => BtcusdtPriceHistory)
  public async findOne(@Args('id') id: number): Promise<BtcusdtPriceHistory> {
    return this.btcusdtPriceHistoryService.findOne(id);
  }
}
