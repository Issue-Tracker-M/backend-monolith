import mongoose, { Document, Model } from "mongoose";

export interface ConfirmationToken {
  user_id: mongoose.Schema.Types.ObjectId;
  token: string;
}

const tokenSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  token: { type: String, required: true },
  createdAt: { type: Date.now, required: true, expires: 43200 },
});

export interface ConfirmationTokenDocument
  extends ConfirmationToken,
    Document {}

export type TokenModel = Model<ConfirmationTokenDocument>;

export default mongoose.model<ConfirmationTokenDocument, TokenModel>(
  "ConfirmationTokens",
  tokenSchema
);
