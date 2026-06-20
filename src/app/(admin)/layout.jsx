import AdminSidebar from "@/Component/Dashboard/admin/AdminSidebar";
import React from "react";
import "../globals.css";

const Adminlayout = ({ children }) => {
  return <AdminSidebar>{children}</AdminSidebar>;
};

export default Adminlayout;
