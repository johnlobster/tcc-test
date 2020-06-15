import hello from './hello';
import { expect } from 'chai';
import "mocha";

describe('First test',
  () => {
    it('should return true', () => {
      const result = hello("John");
      expect(result).to.equal("Hello John");
    });
  });

  export const fred:string = "Hello";
