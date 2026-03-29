import { Document, model, Schema } from "mongoose";

export interface IProperty extends Document {
  title: string;
  location: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Property location is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

export const PropertyModel = model("Property", propertySchema);
