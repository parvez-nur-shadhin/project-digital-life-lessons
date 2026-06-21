"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getReportedLessons = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/reports`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching reported lessons:", error);
    return [];
  }
};

export const ignoreLessonReports = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/reports/${id}/ignore`, {
      method: "PATCH",
    });
    if (!res.ok) return { error: "Failed to ignore reports" };
    return await res.json();
  } catch (error) {
    return { error: "Server connection failed" };
  }
};

export const deleteLesson = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/lessons/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return { error: "Failed to delete lesson" };
    return await res.json();
  } catch (error) {
    return { error: "Server connection failed" };
  }
};
