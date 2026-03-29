import { Document, model, Schema, Types } from "mongoose";

export interface IFavourites extends Document {
  userId: Types.ObjectId;
  propertyId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favouriteSchema = new Schema<IFavourites>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true },
);

favouriteSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

export const FavouriteModel = model<IFavourites>("Favourite", favouriteSchema);
