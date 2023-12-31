import { IsArray, IsOptional, IsString } from 'class-validator';
import { GuildDto, OnMessageDto } from 'xi-jinping-types';

export class CheckRequestDto implements OnMessageDto {
  @IsString()
  citizenID: string;

  @IsString()
  citizenUsername: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  targetCitizenID?: string;

  @IsArray()
  @IsString({ each: true })
  mentionedIDs: string[];

  @IsOptional()
  guild?: GuildDto;
}
