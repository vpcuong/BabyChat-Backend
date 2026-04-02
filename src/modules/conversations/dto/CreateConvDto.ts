import { IsString, IsArray, ArrayMinSize, ValidateNested, IsOptional, IsIn } from "class-validator";
import { Type } from "class-transformer";

class ParticipantInputDto {
  userId: string;
}

export class CreateConvDto {
  @IsString()
  @IsIn(['direct', 'group', 'channel'])
  type: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one participant is required' })
  @ValidateNested({ each: true })
  @Type(() => ParticipantInputDto)
  participants: ParticipantInputDto[];
}
