import DashboardSideBar from "@/Component/Dashboard/user/SideBar";


export default function DashboardLayout({ children }) {
  return (
    <DashboardSideBar>
      {children}
    </DashboardSideBar>
  );
}