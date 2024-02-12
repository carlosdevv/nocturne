import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('This is a notification content.');
    expect(content).toBeTruthy();
  });

  it('should be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('a')).toThrow();
  });

  it('should be able to create a notification content with more than 255 characters', () => {
    expect(() => new Content('a'.repeat(256))).toThrow();
  });
});
