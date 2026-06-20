"use client";

import { addLessons } from "@/lib/actions/lessons";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBookOpen, FaSave } from "react-icons/fa";

const AddLessonPage = () => {
  // 1. Extract isPending so we can show a loading state
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Only initialize the fields the user actually types into
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tone: "",
      image: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // 3. Merge the form data with the user's background data right before sending
    const finalPayload = {
      ...data,
      creatorName: user?.name,
      creatorId: user?.id,
      creatorPlan: user?.plan,
      creatorProfileImage: user?.image,
      creatorEmail: user?.email, // Good to have for database references
      visibility: "public",
    };

    console.log("Saving this to database:", finalPayload);

    setTimeout(async() => {
      // e.g., await serverMutation('/api/lessons', finalPayload, 'POST');
      const res = await addLessons(finalPayload);
      console.log(res)

      alert("Lesson Saved Successfully!");
      setIsSubmitting(false);
      reset();
    }, 1500);
  };

  // 4. Prevent the form from rendering until we know who the user is
  if (isPending) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 5. Optional: If they aren't logged in, don't let them see the form
  if (!user) {
    redirect('/sign-up');
    
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex items-center justify-center">
      <div className="card w-full max-w-3xl bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-6 border-b border-base-200 pb-4">
            <FaBookOpen className="text-3xl text-primary" />
            <div>
              <h2 className="card-title text-2xl font-bold">
                Add a New Lesson
              </h2>
              <p className="text-base-content/70 text-sm">
                Document your growth, insights, and wisdom.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* 1. Lesson Title */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Lesson Title</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Why failure is the best teacher..."
                className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                })}
              />
              {errors.title && (
                <span className="label-text-alt text-error mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* 2. Full Description / Story */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Full Description / Story / Insight
                </span>
              </label>
              <textarea
                placeholder="Share your story and what you learned..."
                className={`textarea textarea-bordered h-32 w-full ${errors.description ? "textarea-error" : ""}`}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message:
                      "Please provide a little more detail (min 20 characters)",
                  },
                })}
              ></textarea>
              {errors.description && (
                <span className="label-text-alt text-error mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 3. Category */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.category ? "select-error" : ""}`}
                  {...register("category", {
                    required: "Please select a category",
                  })}
                >
                  <option value="" disabled>
                    Select a Category
                  </option>
                  <option value="Personal Growth">Personal Growth</option>
                  <option value="Career">Career</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Mindset">Mindset</option>
                  <option value="Mistakes Learned">Mistakes Learned</option>
                </select>
                {errors.category && (
                  <span className="label-text-alt text-error mt-1">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* 4. Emotional Tone */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Emotional Tone
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.tone ? "select-error" : ""}`}
                  {...register("tone", {
                    required: "Please select an emotional tone",
                  })}
                >
                  <option value="" disabled>
                    Select a Tone
                  </option>
                  <option value="Motivational">Motivational</option>
                  <option value="Sad">Sad</option>
                  <option value="Realization">Realization</option>
                  <option value="Gratitude">Gratitude</option>
                </select>
                {errors.tone && (
                  <span className="label-text-alt text-error mt-1">
                    {errors.tone.message}
                  </span>
                )}
              </div>
            </div>

            {/* 5. Featured Image */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Featured Image URL (Optional)
                </span>
                <span className="label-text-alt text-base-content/60">
                  If uploaded elsewhere
                </span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/your-image.jpg"
                className="input input-bordered w-full"
                {...register("image")}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaSave />
                )}
                {isSubmitting ? "Saving Lesson..." : "Save Lesson"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLessonPage;
