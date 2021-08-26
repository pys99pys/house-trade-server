import * as mongoose from 'mongoose';

export const TradeSchema = new mongoose.Schema({
  landCode: Number,
  yearMonth: String,
  data: String,
});
