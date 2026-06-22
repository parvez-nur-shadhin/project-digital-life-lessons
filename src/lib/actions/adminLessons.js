"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllLessonsAdmin = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/lessons`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching admin lessons:", error);
    return [];
  }
};

export const toggleFeaturedStatus = async (id, newStatus) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/lessons/${id}/feature`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: newStatus }),
    });
    if (!res.ok) return { error: "Failed to update" };
    return await res.json();
  } catch (error) {
    return { error: "Server connection failed" };
  }
};
