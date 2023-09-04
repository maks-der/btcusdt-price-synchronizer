import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesResolver } from './prices.resolver';

@Module({
  providers: [PricesResolver, PricesService],
})
export class PricesModule {}
