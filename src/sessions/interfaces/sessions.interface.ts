import { Document } from 'mongoose';

export interface Session extends Document {
  readonly sessionID: string;
  readonly client_uid: string;
  readonly trainer_uid: string;
  readonly title: string;
  readonly date: string;
  readonly start: string;
  readonly end: string;
  readonly date_posted: string;
  readonly verification: boolean;
}
