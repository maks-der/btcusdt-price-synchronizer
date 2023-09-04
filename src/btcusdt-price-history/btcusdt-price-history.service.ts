import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BtcusdtPriceHistory } from './entities/btcusdt-price-history.entity';

@Injectable()
export class BtcusdtPriceHistoryService {

  constructor(private readonly entityManager: EntityManager) {
  }

  public async findAll(): Promise<BtcusdtPriceHistory[]> {
    return this.entityManager.find(BtcusdtPriceHistory);
  }

  public async findOne(id: number): Promise<BtcusdtPriceHistory> {
    return this.entityManager.findOneBy(BtcusdtPriceHistory, { id: id });
  }
}
