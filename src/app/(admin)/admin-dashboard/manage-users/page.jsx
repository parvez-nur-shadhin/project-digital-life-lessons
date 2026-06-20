"use client";

import React, { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";
import { deleteUser, getUsers, updateUserRole } from "@/lib/actions/user";
import UsersTable from "@/Component/Dashboard/admin/UserTable";
import DeleteUserModal from "@/Component/Dashboard/admin/DeleteUserModal";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const previousUsers = [...users];

    setUsers(
      users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
    );

    try {
      const res = await updateUserRole(userId, newRole);
      if (res.error) throw new Error(res.error);
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update role");
      setUsers(previousUsers);
    }
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    document.getElementById("delete_user_modal").showModal();
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    const previousUsers = [...users];

    setUsers(users.filter((u) => u._id !== userToDelete._id));
    toast.success("User deleted successfully");

    try {
      const res = await deleteUser(userToDelete._id);
      if (res.error) throw new Error(res.error);
    } catch (error) {
      toast.error("Failed to delete user. Restoring...");
      setUsers(previousUsers);
    } finally {
      setUserToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaUserShield className="text-primary" /> Manage Users
          </h1>
          <p className="text-base-content/70 mt-1">
            Update roles or remove accounts across the platform.
          </p>
        </div>
        <div className="badge badge-primary badge-outline font-bold py-3 px-4 shadow-sm">
          {users.length} Total Users
        </div>
      </div>

      <UsersTable
        users={users}
        onRoleChange={handleRoleChange}
        onDeleteClick={openDeleteModal}
      />

      <DeleteUserModal
        userToDelete={userToDelete}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
}
