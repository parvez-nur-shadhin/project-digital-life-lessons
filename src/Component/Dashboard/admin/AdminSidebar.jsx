"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaPlus,
  FaBookOpen,
  FaBookmark,
  FaUser,
  FaBars,
} from "react-icons/fa";

export default function AdminSidebar({ children }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const navLinks = [
    {
      name: "Dashboard Home",
      href: "/admin-dashboard",
      icon: <FaHome className="text-lg" />,
    },
    {
      name: "Manage Users",
      href: "/admin-dashboard/manage-users",
      icon: <FaPlus className="text-lg" />,
    },
    {
      name: "Reported / Flagged Lessons",
      href: "/admin-dashboard/reported-lessons",
      icon: <FaBookOpen className="text-lg" />,
    },
    {
      name: "Admin Profile",
      href: "/admin-dashboard/profile",
      icon: <FaUser className="text-lg" />,
    },

  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        <div className="w-full navbar bg-base-100 border-b border-base-200 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <FaBars className="text-xl" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-lg">My Dashboard</div>
        </div>

        <main className="p-4 md:p-8 flex-1">{children}</main>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-72 min-h-full bg-base-100 text-base-content border-r border-base-200 flex flex-col">
          <div className="mb-8 px-4 mt-2 hidden lg:block">
            <h2 className="text-2xl font-black text-primary">Digital Life Lessons</h2>
          </div>

          <ul className="flex-1 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary text-primary-content hover:bg-primary"
                      : "hover:bg-base-200"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-base-200 pt-4">
            <Link href="/" className="btn btn-outline w-full gap-2">
              Back to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
