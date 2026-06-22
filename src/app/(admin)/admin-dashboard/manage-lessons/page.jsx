"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FaBookOpen, FaLock, FaFlag, FaTrash, FaCheckCircle, FaStar, FaFilter } from "react-icons/fa";
import toast from "react-hot-toast";
import { getAllLessonsAdmin, toggleFeaturedStatus } from "@/lib/actions/adminLessons";
import { deleteLesson } from "@/lib/actions/report";
// import { deleteLesson } from "@/lib/actions/lessons";
// import { deleteLesson } from "@/lib/actions/reports"; // Assuming you have this from earlier

export default function ManageLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  // Filter States
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterVisibility, setFilterVisibility] = useState("All");
  const [filterFlags, setFilterFlags] = useState("All");

  // 1. Fetch Real Data
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessonsAdmin();
        setLessons(data);
      } catch (error) {
        toast.error("Failed to load lessons");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, []);

  // --- DERIVED STATS (Using your actual DB structure) ---
  const publicCount = lessons.filter(l => l.visibility === "public").length;
  const privateCount = lessons.filter(l => l.visibility === "private").length;
  const flaggedCount = lessons.filter(l => l.reports && l.reports.length > 0).length;

  // --- FILTERING LOGIC ---
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const isFlagged = lesson.reports && lesson.reports.length > 0;
      
      const matchCategory = filterCategory === "All" || lesson.category === filterCategory;
      const matchVisibility = filterVisibility === "All" || lesson.visibility === filterVisibility;
      const matchFlags = filterFlags === "All" 
        ? true 
        : filterFlags === "Flagged" ? isFlagged : !isFlagged;
      
      return matchCategory && matchVisibility && matchFlags;
    });
  }, [lessons, filterCategory, filterVisibility, filterFlags]);

  // Extract unique categories safely
  const categories = ["All", ...new Set(lessons.map(l => l.category).filter(Boolean))];

  // --- HANDLERS ---
  const handleToggleFeatured = async (lesson) => {
    const newStatus = !lesson.isFeatured;
    const previousLessons = [...lessons];
    
    // Optimistic UI Update
    setLessons(lessons.map(l => l._id === lesson._id ? { ...l, isFeatured: newStatus } : l));
    
    try {
      const res = await toggleFeaturedStatus(lesson._id, newStatus);
      if (res.error) throw new Error();
      toast.success(newStatus ? "Lesson featured on homepage!" : "Removed from featured");
    } catch (error) {
      toast.error("Failed to update featured status");
      setLessons(previousLessons); // Rollback
    }
  };

  const handleConfirmDelete = async () => {
    if (!lessonToDelete) return;
    const previousLessons = [...lessons];
    
    // Optimistic UI
    setLessons(lessons.filter(l => l._id !== lessonToDelete._id));
    toast.success("Lesson deleted.");

    try {
      const res = await deleteLesson(lessonToDelete._id);
      if (res.error) throw new Error();
    } catch (error) {
      toast.error("Failed to delete lesson");
      setLessons(previousLessons);
    } finally {
      setLessonToDelete(null);
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
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaBookOpen className="text-primary" /> Manage Lessons
        </h1>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* ... (Keep your existing Stats HTML here) ... */}
         <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 flex items-center justify-between">
          <div>
            <p className="text-base-content/60 text-xs font-bold uppercase tracking-widest mb-1">Public Lessons</p>
            <h3 className="text-3xl font-black text-base-content">{publicCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center text-success text-2xl">
            <FaBookOpen />
          </div>
        </div>

        <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 flex items-center justify-between">
          <div>
            <p className="text-base-content/60 text-xs font-bold uppercase tracking-widest mb-1">Private Lessons</p>
            <h3 className="text-3xl font-black text-base-content">{privateCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-full bg-base-300 flex items-center justify-center text-base-content/50 text-2xl">
            <FaLock />
          </div>
        </div>

        <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 flex items-center justify-between">
          <div>
            <p className="text-base-content/60 text-xs font-bold uppercase tracking-widest mb-1">Flagged Content</p>
            <h3 className="text-3xl font-black text-base-content">{flaggedCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center text-error text-2xl">
            <FaFlag />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-base-200/50 p-4 rounded-xl border border-base-200 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-base-content/70 font-semibold mr-2">
          <FaFilter /> Filters:
        </div>
        <select className="select select-bordered select-sm" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={filterVisibility} onChange={(e) => setFilterVisibility(e.target.value)}>
          <option value="All">All Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <select className="select select-bordered select-sm" value={filterFlags} onChange={(e) => setFilterFlags(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Flagged">Flagged Only</option>
          <option value="Clean">Clean</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-200 shadow-sm">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content font-bold">
            <tr>
              <th>Lesson Details</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Status</th>
              <th className="text-center">Featured</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson) => {
              // Check if array has items based on your DB schema
              const isFlagged = lesson.reports && lesson.reports.length > 0;
              
              return (
                <tr key={lesson._id} className="hover:bg-base-200/50">
                  <td>
                    <div className="font-bold max-w-[250px] truncate" title={lesson.title}>{lesson.title}</div>
                    <div className="text-xs text-base-content/60 mt-1">By {lesson.creatorName}</div>
                  </td>
                  <td><span className="badge badge-ghost badge-sm font-semibold">{lesson.category}</span></td>
                  <td>
                    {lesson.visibility === "public" 
                      ? <span className="text-success text-xs font-bold flex items-center gap-1"><FaBookOpen/> Public</span>
                      : <span className="text-base-content/50 text-xs font-bold flex items-center gap-1"><FaLock/> Private</span>}
                  </td>
                  <td>
                    {isFlagged 
                      ? <div className="badge badge-error gap-1 font-bold badge-sm"><FaFlag className="text-[10px]"/> Flagged</div>
                      : <div className="badge badge-ghost gap-1 font-bold badge-sm">Clean</div>}
                  </td>
                  <td className="text-center">
                    <button 
                      onClick={() => handleToggleFeatured(lesson)}
                      className={`btn btn-sm btn-circle btn-ghost text-lg ${lesson.isFeatured ? "text-warning" : "text-base-content/20"}`}
                      title={lesson.isFeatured ? "Remove from Featured" : "Make Featured"}
                    >
                      <FaStar />
                    </button>
                  </td>
                  <td className="text-right">
                    <button 
                      onClick={() => {
                        setLessonToDelete(lesson);
                        document.getElementById("delete_lesson_modal").showModal();
                      }}
                      className="btn btn-sm btn-error" title="Delete Lesson">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_lesson_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error flex items-center gap-2">
            <FaTrash /> Delete Lesson?
          </h3>
          <p className="py-4">Are you sure you want to permanently delete <strong>"{lessonToDelete?.title}"</strong>?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3 w-full">
              <button className="btn btn-outline flex-1">Cancel</button>
              <button onClick={handleConfirmDelete} className="btn btn-error flex-1 text-white">Yes, Delete</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
      
    </div>
  );
}