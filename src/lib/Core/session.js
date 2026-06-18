"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const gettingSession = async () => {
  const data = await auth.api.getSession({
    headers: await headers() 
  });
  return data;
};
