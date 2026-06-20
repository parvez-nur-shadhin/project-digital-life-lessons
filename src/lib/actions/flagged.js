"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFlagged = async () => {
  const res = await fetch(`${baseUrl}/api/flagged`);
  return res.json();
};
