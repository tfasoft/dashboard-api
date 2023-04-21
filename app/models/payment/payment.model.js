import { mongodb } from "$app/connections/index.js";

import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = Schema(
  {
    authority: {
      type: String,
      default: "",
    },
    amount: {
      type: String,
      default: "",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    refid: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongodb.model("Payment", schema);
