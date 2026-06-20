"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

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
