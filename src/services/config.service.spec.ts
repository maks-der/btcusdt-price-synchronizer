import { ConfigService } from './config.service';

describe('ConfigService', () => {
  describe('get()', () => {
    it('should return the value for a valid key', () => {
      process.env.MY_VARIABLE = 'myValue';
      const configService = new ConfigService();

      jest.spyOn(configService as any, 'init');
      const result = configService.get('MY_VARIABLE');

      expect(result).toBe('myValue');
    });

    it('should return undefined for an invalid key', () => {
      const configService = new ConfigService();

      const result = configService.get('NON_EXISTENT_VARIABLE');
      expect(result).toBeUndefined();
    });
  });

  describe('init()', () => {
    it('should initialize data with environment variables', () => {
      process.env.TEST_VARIABLE_1 = 'value1';
      process.env.TEST_VARIABLE_2 = 'value2';

      const configService = new ConfigService();

      expect(configService.get('TEST_VARIABLE_1')).toBe('value1');
      expect(configService.get('TEST_VARIABLE_2')).toBe('value2');
    });

    it('should not initialize data with undefined values', () => {
      const configService = new ConfigService();
      expect(configService.get('UNDEFINED_VARIABLE')).toBeUndefined();
    });
  });
});
