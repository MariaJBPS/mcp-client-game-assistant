export type Message = {
  text: string;
  author: string;
  authorType: Author;
  tokenUsage?: number;
  modelId?: string;
  timestamp?: Date;
};

export enum Author {
  User,
  Model,
}
