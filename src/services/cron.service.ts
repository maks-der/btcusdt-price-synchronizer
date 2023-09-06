import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Binance from 'binance-api-node';
import { EntityManager } from 'typeorm';
import { Price } from '../resources/prices/entities/price.entity';
import { CurrencyPrice } from '../utils/types';
import { ConfigService } from './config.service';
import { CreatePriceDto } from '../resources/prices/dto/create-price.dto';


@Injectable()
export class CronService {
  private readonly cronCurrencies: string[] = [];

  constructor(
    private readonly entityManager: EntityManager,
    configService: ConfigService,
  ) {
    this.cronCurrencies = this.parseCurrencies(configService.get('CURRENCIES'));
  }

  @Cron(CronExpression.EVERY_MINUTE)
  public async handleCron(): Promise<void> {
    try {
      const currencyPrices = await this.getPrices();

      for (const currencyPrice of currencyPrices) {
        const [currency, price] = Object.entries(currencyPrice)[0];

        await this.entityManager.save(Price, new CreatePriceDto(currency, price));
        console.log(`[${new Date().toLocaleString()}] Currency: ${currency} - price: $${price}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  private async getPrices(): Promise<CurrencyPrice[]> {
    const binance = Binance();
    const promises: Promise<any>[] = [];

    for (let i = 0; i < this.cronCurrencies.length; i++) {
      const currency = this.cronCurrencies[i];
      const prom = binance.prices({ symbol: currency });
      promises.push(prom);
    }

    return await Promise.all(promises);
  }

  private parseCurrencies(currString: string | undefined): string[] {
    if (!currString) return [];
    return currString.split(';');
  }
}
