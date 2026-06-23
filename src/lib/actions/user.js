"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUsers = async () => {
  const res = await fetch(`${baseUrl}/api/user`);
  return res.json();
};

export const updateUserRole = async (id, newRole) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (!res.ok) return { error: "Failed to update role" };
    return await res.json();
  } catch (error) {
    return { error: "Server connection failed" };
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return { error: "Failed to delete user" };
    return await res.json();
  } catch (error) {
    return { error: "Server connection failed" };
  }
};


export const getTopContributors = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/api/users/top-contributors`, { 
      cache: "no-store" 
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch top contributors", error);
    return [];
  }
};