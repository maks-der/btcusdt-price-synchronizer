import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Binance from 'binance-api-node';
import { EntityManager } from 'typeorm';
import { Price } from '../resources/prices/entities/price.entity';
import { cronCurrencies } from '../utils/constants';
import { CurrencyPrice } from '../utils/types';

@Injectable()
export class CronService {

  constructor(private readonly entityManager: EntityManager) {
  }

  @Cron('* 1 * * * *')
  // @Cron('* * * * * *')
  public async handleCron(): Promise<void> {

    try {
      const currencyPrices = await this.getPrices();

      for (const currencyPrice of currencyPrices) {
        const [currency, price] = Object.entries(currencyPrice)[0];

        await this.entityManager.save(Price, new Price(currency, price));
        console.log(`[${new Date().toLocaleString()}] Currency: ${currency} - price: $${price}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  private async getPrices(): Promise<CurrencyPrice[]> {
    const binance = Binance();
    const promises = [];

    for (let i = 0; i < cronCurrencies.length; i++) {
      const currency = cronCurrencies[i];
      const prom = binance.prices({ symbol: currency });
      promises.push(prom);
    }

    return await Promise.all(promises);
  }
}
