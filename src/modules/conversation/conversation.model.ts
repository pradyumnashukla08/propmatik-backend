import { model, Schema } from "mongoose";
import { IConversation } from "./conversation.interface";


const conversationSchema = new Schema<IConversation>(
  {
    interactionId: {
      type: Schema.Types.ObjectId,
      ref: "PropertyInteraction",
      required: true,
      unique: true,
    },

    propertyId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ConversationModel =
  model<IConversation>(
    "Conversation",
    conversationSchema
  );