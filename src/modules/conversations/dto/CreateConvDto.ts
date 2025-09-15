import { User } from "src/modules/users/entities/user";
import { Participant } from "src/modules/participants/entities/participant";
import { IsNotEmpty, IsString, IsArray, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateConvDto {

  @IsString()
  type: string; // "direct", "group", "channel"

  @IsString()
  name: string // null for direct messages, required for groups

  @IsString()
  description: string; // optional, for groups/channels

  @IsString()
  avatar: string; // group/channel avatar URL

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one participant is required' })
  @ValidateNested({ each: true, always: true }) // Validates each participant object
  @Type(() => Participant)
  participants: Participant[];
  
  createdBy: User;
}
