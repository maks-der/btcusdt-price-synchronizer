import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Price } from './entities/price.entity';

@Injectable()
export class PricesService {

  constructor(private readonly entityManager: EntityManager) {
  }

  // TODO: add period
  // TODO: fix error when table empty
  public async history(currency: string): Promise<Price[]> {
    return this.entityManager.find(Price, { where: { currency: currency } });
  }

  public async current(currency: string): Promise<Price> {
    const price = await this.entityManager.findOne(Price, {
      where: { currency: currency }, order: { createdAt: 'DESC' },
    });
    if (!price) throw new NotFoundException();
    return price;
  }
}
