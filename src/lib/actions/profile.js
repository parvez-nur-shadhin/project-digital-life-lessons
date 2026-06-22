"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateProfile = async (id, profileData) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/${id}/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });

    if (!res.ok) return { error: "Failed to update profile" };
    return await res.json();
  } catch (error) {
    return { error: "Server connection failed" };
  }
};



export const getUserLessonCount = async (userId) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/lessons-count`, { 
      cache: "no-store" 
    });
    if (!res.ok) return 0;
    
    const data = await res.json();
    return data.totalLessons || 0;
  } catch (error) {
    console.error("Failed to fetch lesson count", error);
    return 0;
  }
};