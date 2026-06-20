"use client";


import { FaUsers, FaBookOpen, FaFlag } from "react-icons/fa";

export default function AdminStatCards({ stats, users, publicLessons, flagged }) {

  const totalFlags = stats?.totalFlags ?? 14;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      
      {/* Card 1: Total Users */}
      <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group">
        <div>
          <p className="text-base-content/60 text-sm font-semibold mb-1 uppercase tracking-wider">Total Users</p>
          <h3 className="text-4xl font-black text-base-content">{users.length}</h3>
          <p className="text-xs font-medium mt-2 flex items-center gap-2 text-base-content/50">
            <span className="bg-success/20 text-success px-2 py-0.5 rounded-full">+12%</span> 
            from last month
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl shadow-inner group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300">
          <FaUsers />
        </div>
      </div>

      {/* Card 2: Public Lessons */}
      <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group">
        <div>
          <p className="text-base-content/60 text-sm font-semibold mb-1 uppercase tracking-wider">Public Lessons</p>
          <h3 className="text-4xl font-black text-base-content">{publicLessons.length}</h3>
          <p className="text-xs font-medium mt-2 flex items-center gap-2 text-base-content/50">
            <span className="bg-success/20 text-success px-2 py-0.5 rounded-full">+5%</span> 
            this week
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success text-2xl shadow-inner group-hover:bg-success group-hover:text-success-content transition-colors duration-300">
          <FaBookOpen />
        </div>
      </div>

      {/* Card 3: Flagged Content */}
      <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group">
        <div>
          <p className="text-base-content/60 text-sm font-semibold mb-1 uppercase tracking-wider">Flagged Content</p>
          <h3 className="text-4xl font-black text-base-content">{flagged.length}</h3>
          <p className="text-xs font-medium mt-2 flex items-center gap-2 text-base-content/50">
            <span className="bg-error/20 text-error px-2 py-0.5 rounded-full">Action Needed</span>
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error text-2xl shadow-inner group-hover:bg-error group-hover:text-error-content transition-colors duration-300">
          <FaFlag />
        </div>
      </div>

    </div>
  );
}