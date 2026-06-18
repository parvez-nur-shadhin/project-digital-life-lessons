"use server";

import { serverFetch, serverMutation } from "../Core/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addLessons = async (lessonsInfo) => {
  return serverMutation('/api/lessons', lessonsInfo, "POST");
};

export const gettingLessons = async () => {
  return serverFetch('/api/lessons')
}

export const getLessonById = async (id) => {
  console.log(id)
  const res = await fetch(`${baseUrl}/api/lessons/${id}`, {
    cache: "no-store"
  });
  return res.json();
};