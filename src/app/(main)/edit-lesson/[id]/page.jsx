"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import {
  FaEdit,
  FaImage,
  FaLock,
  FaGlobeAmericas,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Link from "next/link";

import { getLessonById, updateLesson } from "@/lib/actions/lessons";

export default function EditLessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id;

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isPremium = user?.plan === "premium";

  const [isLoadingData, setIsLoadingData] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "Personal Growth",
      tone: "Realization",
      image: "",
      visibility: "public",
    },
  });

  useEffect(() => {
    const fetchExistingLesson = async () => {
      try {
        const lesson = await getLessonById(lessonId);

        if (!lesson || lesson.error) {
          toast.error("Lesson not found.");
          router.push("/dashboard/my-lessons");
          return;
        }

        if (
          lesson.creatorId !== user?.id &&
          lesson.creatorEmail !== user?.email
        ) {
          toast.error("You do not have permission to edit this lesson.");
          router.push("/dashboard/my-lessons");
          return;
        }

        reset({
          title: lesson.title,
          description: lesson.description,
          category: lesson.category || "Personal Growth",
          tone: lesson.tone || "Realization",
          image: lesson.image || "",
          visibility: lesson.visibility || "public",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch lesson details.");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user && lessonId) {
      fetchExistingLesson();
    }
  }, [user, lessonId, reset, router]);

  useEffect(() => {
    if (user && !isPremium) {
      setValue("visibility", "public");
    }
  }, [user, isPremium, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        visibility: isPremium ? data.visibility : "public",
      };

      const res = await updateLesson(lessonId, updatedData);

      if (!res || res.error) {
        throw new Error(res?.error || "Failed to update lesson");
      }

      toast.success("Lesson updated successfully!");
      router.push("/dashboard/my-lessons");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isPending || isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="mb-4">You must be logged in to edit lessons.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl mx-auto w-full pb-12">
        <div className="mb-8 mt-4">
          <Link
            href="/dashboard/my-lessons"
            className="btn btn-ghost btn-sm mb-4 gap-2 px-0 hover:bg-transparent text-base-content/60 hover:text-primary"
          >
            <FaArrowLeft /> Back to My Lessons
          </Link>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-3 mb-2">
            <FaEdit className="text-info" />
            Edit Lesson
          </h1>
          <p className="text-base-content/70">
            Update your insights, fix a typo, or change access levels.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Lesson Title <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Why saying 'yes' to everything almost broke me..."
                  className={`input input-bordered w-full ${errors.title ? "input-error" : "focus:input-primary"}`}
                  {...register("title", {
                    required: "Lesson title is required.",
                  })}
                />
                {errors.title && (
                  <span className="text-error text-sm mt-1.5 font-medium px-1">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Full Description / Story{" "}
                    <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  placeholder="Share your experience..."
                  className={`textarea textarea-bordered h-48 w-full leading-relaxed ${errors.description ? "textarea-error" : "focus:textarea-primary"}`}
                  {...register("description", {
                    required: "Please share your story.",
                  })}
                ></textarea>
                {errors.description && (
                  <span className="text-error text-sm mt-1.5 font-medium px-1">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Category <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full focus:select-primary"
                    {...register("category")}
                  >
                    <option value="Personal Growth">Personal Growth</option>
                    <option value="Career">Career</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Mindset">Mindset</option>
                    <option value="Mistakes Learned">Mistakes Learned</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Emotional Tone <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full focus:select-primary"
                    {...register("tone")}
                  >
                    <option value="Motivational">Motivational</option>
                    <option value="Sad">Sad</option>
                    <option value="Realization">Realization</option>
                    <option value="Gratitude">Gratitude</option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-base-content flex items-center gap-2">
                    <FaImage className="text-base-content/50" />
                    Featured Image URL (Optional)
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  className="input input-bordered w-full focus:input-primary"
                  {...register("image")}
                />
              </div>

              <div className="form-control w-full md:w-1/2 pt-2">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Access Level
                  </span>
                </label>

                <div
                  className={
                    !isPremium ? "tooltip tooltip-right w-full" : "w-full"
                  }
                  data-tip={
                    !isPremium
                      ? "Upgrade to Premium to create paid lessons."
                      : ""
                  }
                >
                  <select
                    className="select select-bordered w-full"
                    {...register("visibility")}
                    disabled={!isPremium}
                  >
                    <option value="public">Free (Public Access)</option>
                    <option value="premium">Premium (Subscribers Only)</option>
                  </select>
                </div>

                <label className="label mt-1">
                  <span className="label-text-alt flex items-center gap-1 font-medium">
                    {isPremium ? (
                      <span className="text-success flex items-center gap-1">
                        <FaLock className="text-[10px]" /> Premium Active
                      </span>
                    ) : (
                      <span className="text-base-content/60 flex items-center gap-1">
                        <FaGlobeAmericas className="text-[10px]" /> Defaults to
                        Free
                      </span>
                    )}
                  </span>
                </label>
              </div>

              <div className="form-control mt-8 pt-6 border-t border-base-200">
                <button
                  type="submit"
                  className="btn btn-info text-white w-full sm:w-auto sm:px-12 ml-auto shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin text-lg" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
