"use server";

import { serverMutation } from "../Core/server";

export const addLessons = async (lessonsInfo) => {
  return serverMutation('/api/lessons', lessonsInfo, "POST");
};
