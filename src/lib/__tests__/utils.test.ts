import { cn } from '../utils';

describe('Utils', () => {
  describe('cn function', () => {
    it('should combine class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'conditional')).toBe('base conditional');
      expect(cn('base', false && 'conditional')).toBe('base');
    });

    it('should handle undefined and null values', () => {
      expect(cn('base', undefined, null, 'valid')).toBe('base valid');
    });

    it('should handle empty strings', () => {
      expect(cn('base', '', 'valid')).toBe('base valid');
    });

    it('should handle complex combinations', () => {
      const isActive = true;
      const isDisabled = false;
      
      expect(cn(
        'base-class',
        isActive && 'active',
        isDisabled && 'disabled',
        'always-present'
      )).toBe('base-class active always-present');
    });
  });
}); 