import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명을 작성하지 않았습니다.",
    },
    id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CertificateModel = model("Certificate", CertificateSchema);
export { CertificateModel };
