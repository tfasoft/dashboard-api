import { mongodb } from "$app/connections/index.js";

import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = Schema(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    accessToken: {
      type: String,
      required: true,
      default: "",
    },
    serId: {
      type: String,
      required: true,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongodb.model("Service", schema);
