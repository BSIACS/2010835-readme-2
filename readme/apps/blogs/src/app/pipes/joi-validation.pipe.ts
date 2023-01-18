import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform<T>{
  constructor(private schema: ObjectSchema){}

  async transform(value: T){
    try {
      await this.schema.validateAsync(value);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return value as T;
  }
}
