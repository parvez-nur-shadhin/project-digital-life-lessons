"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUsers = async () => {
  const res = await fetch(`${baseUrl}/api/user`);
  return res.json();
};
