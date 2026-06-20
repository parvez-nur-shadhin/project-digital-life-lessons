import { createPayment } from "@/lib/actions/payment";
import { gettingSession } from "@/lib/Core/session";

import Link from "next/link";
import { FaCheckCircle, FaDownload, FaArrowRight } from "react-icons/fa";

export default async function SuccessPage() {
  const session = await gettingSession();
  const user = session?.user;
  const plan = "premium";

  // Static or state-based transaction details
  // (Since we removed the server-side Stripe fetch)
  const transaction = {
    id: "TXN-9876543210",
    email: user.email,
    amount: "৳1500",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  const paymentInfo = {
    name: user?.name,
    email: user?.email,
    plan: plan,
    amount: "৳1500",
  };

  if (session) {
    try {
      const res = await createPayment(paymentInfo);
      console.log("Database Response:", res);
    } catch (error) {
      console.error("Failed to save payment to database:", error);
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border-t-8 border-success">
        <div className="card-body items-center text-center">
          {/* Success Icon */}
          <div className="mb-4 text-success">
            <FaCheckCircle className="text-7xl drop-shadow-sm" />
          </div>

          <h2 className="card-title text-3xl font-bold mb-2">
            Payment Successful!
          </h2>
          <p className="text-base-content/70 mb-6">
            Thank you for your purchase! A confirmation email has been sent to{" "}
            <strong>{transaction.email}</strong>. Your Premium lifetime access
            is now active.
          </p>

          {/* Transaction Receipt Details */}
          <div className="bg-base-200/50 rounded-box p-5 w-full text-left space-y-4 mb-8 border border-base-300">
            <div className="flex justify-between items-center border-b border-base-300 pb-3">
              <span className="text-base-content/70 font-medium">
                Transaction ID
              </span>
              <span
                className="font-semibold text-xs md:text-sm text-right max-w-[50%] truncate"
                title={transaction.id}
              >
                {transaction.id}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-base-300 pb-3">
              <span className="text-base-content/70 font-medium">Date</span>
              <span className="font-semibold text-sm md:text-base">
                {transaction.date}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 text-lg">
              <span className="font-bold">Total Paid</span>
              <span className="font-bold text-primary">
                {transaction.amount}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard" className="btn btn-primary flex-1 gap-2">
              Go to Dashboard <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
