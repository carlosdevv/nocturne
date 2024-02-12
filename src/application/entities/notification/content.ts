export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string) {
    return content.length >= 5 && content.length <= 255;
  }

  constructor(content: string) {
    const isValidContentLength = this.validateContentLength(content);

    if (!isValidContentLength) {
      throw new Error('Invalid content length');
    }

    this.content = content;
  }
}
