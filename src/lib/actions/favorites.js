"use server";

import { serverFetch } from "../Core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFavorites = async () => {
  return serverFetch("/api/favorites");
};

export const removeFavorite = async (id) => {
  const res = await fetch(`${baseUrl}/api/favorites/${id}`, {
    method: "DELETE",
  });

  return res.json();
};
