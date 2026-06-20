"use server";
import { serverMutation } from "../Core/server";

export const createPayment = async (paymentInfo) => {
  return serverMutation("/api/payments", paymentInfo, "POST");
};
