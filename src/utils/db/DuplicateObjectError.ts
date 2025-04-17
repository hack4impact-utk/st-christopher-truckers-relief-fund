export class DuplicateObjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateObjectError";
  }
}
