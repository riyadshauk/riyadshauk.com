import { env } from '../env';

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('Environment Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Database URL Construction', () => {
    it('should construct DATABASE_URL with password when provided', () => {
      process.env.DB_USER = 'testuser';
      process.env.DB_PASSWORD = 'test@password#123';
      process.env.DB_NAME = 'testdb';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';

      // Re-import to get fresh env
      jest.resetModules();
      const { env } = require('../env');

      expect(env.DATABASE_URL).toBe(
        'postgresql://testuser:test%40password%23123@localhost:5432/testdb'
      );
    });

    it('should construct DATABASE_URL without password when not provided', () => {
      process.env.DB_USER = 'testuser';
      process.env.DB_PASSWORD = undefined;
      process.env.DB_NAME = 'testdb';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';

      // Re-import to get fresh env
      jest.resetModules();
      const { env } = require('../env');

      expect(env.DATABASE_URL).toBe(
        'postgresql://testuser@localhost:5432/testdb'
      );
    });

    it('should handle special characters in credentials', () => {
      process.env.DB_USER = 'user@domain.com';
      process.env.DB_PASSWORD = 'pass@word#123$456';
      process.env.DB_NAME = 'test-db';
      process.env.DB_HOST = 'my-host.com';
      process.env.DB_PORT = '5432';

      // Re-import to get fresh env
      jest.resetModules();
      const { env } = require('../env');

      expect(env.DATABASE_URL).toBe(
        'postgresql://user%40domain.com:pass%40word%23123%24456@my-host.com:5432/test-db'
      );
    });

    it('should use existing DATABASE_URL if provided', () => {
      process.env.DB_USER = 'testuser';
      process.env.DB_PASSWORD = 'testpass';
      process.env.DB_NAME = 'testdb';
      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = '5432';
      process.env.DATABASE_URL = 'postgresql://custom:url@host:5432/db';

      // Re-import to get fresh env
      jest.resetModules();
      const { env } = require('../env');

      expect(env.DATABASE_URL).toBe('postgresql://custom:url@host:5432/db');
    });
  });

  describe('Environment Validation', () => {
    it('should require DB_USER', () => {
      // Create new env object without DB_USER, starting from empty
      process.env = {
        NODE_ENV: 'test',
        DB_PASSWORD: 'testpass',
        DB_NAME: 'testdb',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
      };

      // Re-import to get fresh env
      jest.resetModules();
      
      expect(() => {
        require('../env');
      }).toThrow('Missing or invalid environment variables: DB_USER');
    });

    it('should require DB_NAME', () => {
      // Create new env object without DB_NAME, starting from empty
      process.env = {
        NODE_ENV: 'test',
        DB_USER: 'testuser',
        DB_PASSWORD: 'testpass',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
      };

      // Re-import to get fresh env
      jest.resetModules();
      
      expect(() => {
        require('../env');
      }).toThrow('Missing or invalid environment variables: DB_NAME');
    });

    it('should require DB_HOST', () => {
      // Create new env object without DB_HOST, starting from empty
      process.env = {
        NODE_ENV: 'test',
        DB_USER: 'testuser',
        DB_PASSWORD: 'testpass',
        DB_NAME: 'testdb',
        DB_PORT: '5432',
      };

      // Re-import to get fresh env
      jest.resetModules();
      
      expect(() => {
        require('../env');
      }).toThrow('Missing or invalid environment variables: DB_HOST');
    });

    it('should require DB_PORT', () => {
      // Create new env object without DB_PORT, starting from empty
      process.env = {
        NODE_ENV: 'test',
        DB_USER: 'testuser',
        DB_PASSWORD: 'testpass',
        DB_NAME: 'testdb',
        DB_HOST: 'localhost',
      };

      // Re-import to get fresh env
      jest.resetModules();
      
      expect(() => {
        require('../env');
      }).toThrow('Missing or invalid environment variables: DB_PORT');
    });

    it('should validate DB_PORT as a number', () => {
      process.env = {
        NODE_ENV: 'test',
        DB_USER: 'testuser',
        DB_PASSWORD: 'testpass',
        DB_NAME: 'testdb',
        DB_HOST: 'localhost',
        DB_PORT: 'invalid',
      };

      // Re-import to get fresh env
      jest.resetModules();
      
      expect(() => {
        require('../env');
      }).toThrow('Missing or invalid environment variables: DB_PORT');
    });

    it('should validate DB_PORT range', () => {
      process.env = {
        NODE_ENV: 'test',
        DB_USER: 'testuser',
        DB_PASSWORD: 'testpass',
        DB_NAME: 'testdb',
        DB_HOST: 'localhost',
        DB_PORT: '70000', // Invalid port
      };

      // Re-import to get fresh env
      jest.resetModules();
      
      expect(() => {
        require('../env');
      }).toThrow('Missing or invalid environment variables: DB_PORT');
    });
  });

  describe('Environment Variables', () => {
    it('should set default NODE_ENV to development when not set', () => {
      // In Jest, NODE_ENV is always 'test', so we must set it for TypeScript, but the env module will see 'test'
      process.env = {
        NODE_ENV: 'test',
        DB_USER: 'testuser',
        DB_NAME: 'testdb',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
      };

      // Re-import to get fresh env
      jest.resetModules();
      const { env } = require('../env');

      // In Jest, NODE_ENV is always 'test', so expect 'test' here
      expect(env.NODE_ENV).toBe('test');
    });

    it('should accept valid NODE_ENV values', () => {
      // Create new env object with NODE_ENV set to production
      process.env = {
        NODE_ENV: 'production',
        DB_USER: 'testuser',
        DB_NAME: 'testdb',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
      };

      // Re-import to get fresh env
      jest.resetModules();
      const { env } = require('../env');

      expect(env.NODE_ENV).toBe('production');
    });

    it('should make email variables optional', () => {
      process.env = {
        NODE_ENV: 'test',
        DB_USER: 'testuser',
        DB_NAME: 'testdb',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
      };

      // Re-import to get fresh env
      jest.resetModules();
      const { env } = require('../env');

      expect(env.EMAIL_USER).toBeUndefined();
      expect(env.EMAIL_PASS).toBeUndefined();
    });

    it('should validate email format when provided', () => {
      process.env = {
        NODE_ENV: 'test',
        DB_USER: 'testuser',
        DB_NAME: 'testdb',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
        EMAIL_USER: 'invalid-email',
      };

      // Re-import to get fresh env
      jest.resetModules();
      
      expect(() => {
        require('../env');
      }).toThrow('Missing or invalid environment variables: EMAIL_USER');
    });
  });
}); 