import { IsArray, IsOptional, IsString } from 'class-validator';

export class CheckRequestDto {
  @IsString()
  citizenID: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  targetCitizenID?: string;

  @IsArray()
  @IsString({ each: true })
  mentionedIDs: string[];
}
