"use server";

import { serverFetch, serverMutation } from "../Core/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addLessons = async (lessonsInfo) => {
  return serverMutation("/api/lessons", lessonsInfo, "POST");
};

export const gettingLessons = async () => {
  return serverFetch("/api/lessons");
};

export const getLessonById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/lessons/${id}`, {
      cache: "no-store", // Ensure we always get the freshest data
    });
    if (!res.ok) return { error: "Failed to fetch lesson" };
    return await res.json();
  } catch (error) {
    return { error: "Server error" };
  }
};

export const updateLesson = async (id, updatedData) => {
  try {
    const res = await fetch(`${baseUrl}/api/lessons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) return { error: "Failed to update lesson" };
    return await res.json();
  } catch (error) {
    return { error: "Server error" };
  }
};

export const deleteLesson = async (id) => {
  const res = await fetch(`${baseUrl}/api/lessons/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const addFavoriteLesson = async (lesson) => {
  return serverMutation("/api/favorites", lesson);
};

export const reportLesson = async (id, reportData) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/lessons/${id}/report`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    });

    if (!res.ok) return { error: "Failed to submit report" };
    return await res.json();
  } catch (error) {
    return { error: "Server connection failed" };
  }
};



export const toggleSaveLesson = async (id, userId) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/api/lessons/${id}/save`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    
    if (!res.ok) return { error: "Failed to toggle save" };
    return await res.json();
  } catch (error) {
    return { error: "Server connection failed" };
  }
};
