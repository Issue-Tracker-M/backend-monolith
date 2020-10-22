import mongoose, { Document, Model } from "mongoose";

export interface PasswordResetToken {
  user_id: mongoose.Schema.Types.ObjectId;
  token: string;
}

const tokenSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  token: { type: String, required: true },
  createdAt: { type: Date.now, required: true, expires: 43200 },
});

export interface PasswordTokenDocument extends PasswordResetToken, Document {}

export type TokenModel = Model<PasswordTokenDocument>;

export default mongoose.model<PasswordTokenDocument, TokenModel>(
  "PasswordResetTokens",
  tokenSchema
);
