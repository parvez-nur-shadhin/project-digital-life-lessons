"use client";

import React from "react";
import { FaTrash } from "react-icons/fa";

export default function DeleteUserModal({ userToDelete, onConfirmDelete }) {
  return (
    <dialog id="delete_user_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-error flex items-center gap-2">
          <FaTrash /> Delete User?
        </h3>
        <p className="py-4">
          Are you sure you want to permanently delete{" "}
          <strong>{userToDelete?.name || userToDelete?.email}</strong>? This
          action cannot be undone.
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2 w-full">
            <button className="btn btn-outline flex-1">Cancel</button>
            <button onClick={onConfirmDelete} className="btn btn-error flex-1">
              Yes, Delete User
            </button>
          </form>
        </div>
      </div>

  
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
