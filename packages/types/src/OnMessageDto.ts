export interface OnMessageDto {
  citizenID: string;
  message: string;
  targetCitizenID?: string;
  mentionedIDs: string[];
}
