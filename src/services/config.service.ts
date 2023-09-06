import { config } from 'dotenv';
import * as process from 'process';

export class ConfigService {
  private data: Map<string, string> = new Map();

  constructor() {
    config();
    this.init();
  }

  public get(key: string): string | undefined {
    return this.data.get(key);
  }

  private init(): void {
    for (const [key, value] of Object.entries(process.env)) {
      if (!value) continue;
      this.data.set(key, value);
    }
  }
}

