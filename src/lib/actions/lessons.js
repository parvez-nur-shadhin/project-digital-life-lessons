"use server";

import { revalidatePath } from "next/cache";

import { serverFetch, serverMutation } from "../Core/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);

export const addLessons = async (lessonsInfo) => {
  return serverMutation("/api/lessons", lessonsInfo, "POST");
};

export const gettingLessons = async () => {
  return serverFetch("/api/lessons");
};

export const getLessonById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/lessons/${id}`, {
      cache: "no-store",
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

export async function toggleLikeLesson(lessonId, userId) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/api/lessons/${lessonId}/like`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error("Failed to toggle like");

    revalidatePath("/lessons");

    return await res.json();
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export const getSavedLessons = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/saved`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch saved lessons");

    return await res.json();
  } catch (error) {
    console.error("Error fetching saved lessons:", error);
    return [];
  }
};

export const getUserProfile = async (userId) => {
  console.log(`${baseUrl}/api/user/${userId}`);
  try {
    const res = await fetch(`${baseUrl}/api/user/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `Backend rejected Profile Fetch with status: ${res.status}`,
      );
      throw new Error("Failed to fetch user profile");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    return null;
  }
};

export const getUserLessons = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/lessons`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch user lessons");

    return await res.json();
  } catch (error) {
    console.error("Error fetching user lessons:", error);
    return [];
  }
};
