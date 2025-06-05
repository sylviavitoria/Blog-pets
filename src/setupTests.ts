import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

Object.defineProperty(global, 'console', {
  value: {
    ...console,
    // log: jest.fn(),
    // debug: jest.fn(),
    // info: jest.fn(),
    // warn: jest.fn(),
    error: jest.fn()
  }
});
