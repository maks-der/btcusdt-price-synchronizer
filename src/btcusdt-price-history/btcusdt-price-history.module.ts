import { Module } from '@nestjs/common';
import { BtcusdtPriceHistoryService } from './btcusdt-price-history.service';
import { BtcusdtPriceHistoryResolver } from './btcusdt-price-history.resolver';

@Module({
  providers: [BtcusdtPriceHistoryResolver, BtcusdtPriceHistoryService],
})
export class BtcusdtPriceHistoryModule {}
