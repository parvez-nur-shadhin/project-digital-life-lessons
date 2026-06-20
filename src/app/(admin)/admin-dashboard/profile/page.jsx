"use client";

import React, { useEffect, useState } from "react";
import {
  FaUserShield,
  FaSave,
  FaCamera,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { updateProfile } from "@/lib/actions/profile";
import Image from "next/image";

export default function AdminProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);

    try {
      const res = await updateProfile(user.id, { name, image });

      if (res.error) throw new Error(res.error);

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">Please log in to view this page.</div>
    );
  }

  const defaultAvatar = `https://ui-avatars.com/api/?name=${name || "Admin"}&background=random&size=200`;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8 text-base-content">
        <FaUserShield className="text-primary" /> Admin Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 space-y-6">
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6 text-center">
            <div className="avatar indicator mb-5">
              <span className="indicator-item badge badge-primary font-bold shadow-lg border-2 border-base-100">
                ADMIN
              </span>
              <div className="w-32 rounded-full ring-4 ring-primary/20 ring-offset-base-100 ring-offset-4">
                <Image
                  src={image || defaultAvatar}
                  alt="Admin Avatar"
                  className="object-cover"
                  width={128}
                  height={128}
                />
              </div>
            </div>
            <h2 className="font-bold text-2xl text-base-content">
              {name || "System Admin"}
            </h2>
            <p className="text-base-content/50 text-sm font-medium mt-1">
              {user.email}
            </p>
          </div>

          <div className="bg-base-200/50 p-6 rounded-2xl border border-base-200">
            <h3 className="font-bold text-[11px] text-base-content/50 uppercase tracking-widest mb-5">
              Activity Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-base-300 pb-3">
                <span className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                  🛡️ Moderation
                </span>
                <span className="badge badge-primary badge-sm font-bold">
                  142
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                  ✍️ Lessons
                </span>
                <span className="badge badge-ghost badge-sm font-bold border-base-300">
                  18
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                Edit Profile
              </h2>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text text-xs font-bold uppercase tracking-wider text-base-content/60">
                      Email Address
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 bg-base-200/50 border-base-200 text-base-content/50 shadow-inner">
                    <FaEnvelope className="text-base-content/40" />
                    <input
                      type="email"
                      value={user.email}
                      className="grow cursor-not-allowed font-medium"
                      disabled
                    />
                    <FaLock className="text-base-content/30" />
                  </label>
                  <label className="label pt-1">
                    <span className="label-text-alt text-base-content/50 font-medium">
                      Email cannot be changed from this panel.
                    </span>
                  </label>
                </div>

                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text text-xs font-bold uppercase tracking-wider text-base-content/60">
                      Display Name
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 shadow-sm transition-all hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                    <FaUser className="text-base-content/40" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="grow font-medium text-base-content"
                      required
                    />
                  </label>
                </div>

                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text text-xs font-bold uppercase tracking-wider text-base-content/60">
                      Profile Photo URL
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 shadow-sm transition-all hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                    <FaCamera className="text-base-content/40" />
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://imgur.com/..."
                      className="grow font-medium text-base-content"
                    />
                  </label>
                  <label className="label pt-1">
                    <span className="label-text-alt text-base-content/50 font-medium">
                      Provide a direct image link for your avatar.
                    </span>
                  </label>
                </div>

                <div className="mt-8 pt-6 border-t border-base-200 flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <FaSave className="text-lg" />
                    )}
                    {isSaving ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
