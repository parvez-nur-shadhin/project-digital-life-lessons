
import { FaChartLine } from "react-icons/fa";
import AdminStatCards from "@/Component/Dashboard/Admin/AdminStatCards";
import AdminGrowthChart from "@/Component/Dashboard/Admin/AdminGrowthChart";
import AdminOverviewTables from "@/Component/Dashboard/Admin/AdminOverviewTables";
import { getUsers } from "@/lib/actions/user";
import { gettingLessons } from "@/lib/actions/lessons";
import { getFlagged } from "@/lib/actions/flagged";

export default async function AdminDashboardHome() {

  const users = await getUsers();
  const lessons = await gettingLessons();
  const publicLessons = lessons.filter(lesson => lesson.visibility === 'public' );
  const flagged = await getFlagged();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaChartLine className="text-primary" /> Admin Overview
        </h1>
        <p className="text-base-content/70 mt-1">
          Platform-wide analytics, user growth, and recent activity.
        </p>
      </div>

      <AdminStatCards users={users} publicLessons={publicLessons} flagged={flagged} />

      <AdminGrowthChart />

      <AdminOverviewTables />
    </div>
  );
}
