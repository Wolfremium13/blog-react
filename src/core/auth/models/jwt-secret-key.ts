import {MissingParameterException} from "@/core/exceptions/exceptions";

export class JwtSecretKey {
  private constructor(public readonly value: string) {
  }

  static create(givenSecret: string): JwtSecretKey {
    if (!givenSecret) {
      throw new MissingParameterException("Invalid secret");
    }

    return new JwtSecretKey(givenSecret);
  }
}
