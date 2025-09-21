import { User } from "src/modules/users/entities/user";
import { IsMongoId, IsOptional, IsDate, IsDefined, IsIn } from "class-validator";
import { Transform, Type } from "class-transformer";
// Define the Participant subdocument schema
export class Participant {
  @IsMongoId()
  userId: string;

  @IsDefined() // <-- Make role required
  @IsIn(['admin', 'member', 'moderator'])
  role: string; // "admin", "member", "moderator"

  @Transform(({ value }) => value ?? new Date())
  @Type(() => Date)
  @IsDate()
  joinedAt?: Date = new Date(); 

  @IsOptional()
  @IsDate()
  leftAt?: Date;
  
  @IsOptional()
  isActive?: boolean;
}
