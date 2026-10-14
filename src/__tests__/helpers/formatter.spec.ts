import { describe, it, expect } from 'vitest';

import {
  formatterDuration,
  capitalizeFirstLetter,
  formatterDate,
  formatterTitleLength,
} from '@/helpers/formatter';

describe('formatter.ts', () => {
  describe('formatterDuration', () => {
    it('should return an empty string when seconds is zero', () => {
      expect(formatterDuration(0)).toBe('');
    });

    it('should format duration in minutes and hours', () => {
      expect(formatterDuration(60)).toBe('1min');
      expect(formatterDuration(120)).toBe('2min');
      expect(formatterDuration(3600)).toBe('1hr 0min');
      expect(formatterDuration(3660)).toBe('1hr 1min');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter', () => {
      expect(capitalizeFirstLetter('teste')).toBe('Teste');
    });
  });

  describe('formatterDate', () => {
    it('should return an empty string when date is empty', () => {
      expect(formatterDate('')).toBe('');
    });
  });

  describe('formatterTitleLength', () => {
    it('should keep titles within the maximum length', () => {
      expect(formatterTitleLength('Teste teste')).toBe('Teste teste');
    });

    it('should truncate titles longer than 80 characters', () => {
      const title = 'a'.repeat(81);

      expect(formatterTitleLength(title)).toBe(`${'a'.repeat(80)}...`);
    });
  });
});
