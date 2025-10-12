import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAttributeValueDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsUUID()
  @IsNotEmpty()
  attributeId: string;
}
