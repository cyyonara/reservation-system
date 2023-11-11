import mongoose, { Document } from "mongoose";

type Review = {
  author: mongoose.Schema.Types.ObjectId;
  reviewBody: string;
  rate: number;
};

type M_Service = Document & {
  serviceId: string;
  name: string;
  description: string;
  imageLinks: string[];
  isAvailable: boolean;
  price: number;
  reviews: Review[];
};

const serviceSchema = new mongoose.Schema<M_Service>(
  {
    serviceId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageLinks: {
      type: [String],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reviews: {
      type: [
        {
          author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          reviewBody: { type: String, required: true },
          rate: { type: Number, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model<M_Service>("Service", serviceSchema);

export default Service;
