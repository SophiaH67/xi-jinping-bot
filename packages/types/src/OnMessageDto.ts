export interface OnMessageDto {
  citizenID: string;
  citizenUsername: string;
  guild?: GuildDto;
  message: string;
  targetCitizenID?: string;
  mentionedIDs: string[];
}

export interface GuildDto {
  id: string;
  name: string;
}
