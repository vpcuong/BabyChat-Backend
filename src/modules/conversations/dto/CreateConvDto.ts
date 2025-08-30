import { User } from "src/modules/users/entities/user";
import { Participant } from "src/modules/participants/entities/participant";
import { IsString } from "class-validator";

export class CreateConvDto {

  @IsString()
  type: string; // "direct", "group", "channel"
  @IsString()
  name: string // null for direct messages, required for groups
  @IsString()
  description: string; // optional, for groups/channels
  @IsString()
  avatar: string; // group/channel avatar URL
  
  participants: Participant[];
  
  createdBy: User;
}
