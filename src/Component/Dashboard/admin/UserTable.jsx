"use client";

import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";

export default function UsersTable({ users, onRoleChange, onDeleteClick }) {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-box border border-base-200 shadow-sm">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Lessons</th>
            <th>Role</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-10 h-10">
                      <Image
                        src={u.image}
                        alt={u.name}
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{u.name || "Unknown User"}</div>
                  </div>
                </div>
              </td>
              <td className="text-sm">{u.email}</td>
              <td>
                <span className="badge badge-ghost font-bold">
                  {u.totalLessons || 0}
                </span>
              </td>
              <td>
                <select
                  className={`select select-sm w-full max-w-[120px] font-semibold ${u.role === "admin" ? "select-primary text-primary" : "select-bordered"}`}
                  value={u.role || "user"}
                  onChange={(e) => onRoleChange(u._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="text-right">
                <button
                  onClick={() => onDeleteClick(u)}
                  className="btn btn-sm btn-square btn-error btn-outline"
                  title="Delete User"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}

      
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-8 text-base-content/50">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
