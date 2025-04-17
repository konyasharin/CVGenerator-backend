import * as bcrypt from 'bcrypt';

export class Crypto {
  public static hash(value: string) {
    return bcrypt.hash(value, 10);
  }

  public static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
