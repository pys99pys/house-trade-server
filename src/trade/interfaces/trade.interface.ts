import { Document } from 'mongoose';

export interface Trade extends Document {
  readonly landCode: string;
  readonly yearMonth: string;
  readonly data: string;
}
