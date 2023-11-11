import mongoose, { Document } from "mongoose";

type D_Reservation = Document & {
  client: mongoose.Schema.Types.ObjectId;
  service: mongoose.Schema.Types.ObjectId;
  reservationDate: Date;
  isDone: boolean;
  isCancelled: boolean;
  isPending: boolean;
};

const reservationSchema = new mongoose.Schema<D_Reservation>(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    reservationDate: {
      type: Date,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
    isCancelled: {
      type: Boolean,
      required: true,
    },

    isPending: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model<D_Reservation>("Reservation", reservationSchema);

export default Reservation;
