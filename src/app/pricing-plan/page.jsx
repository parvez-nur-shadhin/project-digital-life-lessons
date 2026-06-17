import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const PricingTable = () => {
  // Keeping the data in an array makes the table much easier to read and edit
  const features = [
    {
      name: "Number of lessons that can be created",
      free: "Up to 10",
      premium: "Unlimited",
    },
    {
      name: "Premium lesson creation access",
      free: false,
      premium: true,
    },
    {
      name: "Ad-free experience",
      free: false,
      premium: true,
    },
    {
      name: "Priority listing in public lessons",
      free: false,
      premium: true,
    },
    {
      name: "Access to premium content from other users",
      free: false,
      premium: true,
    },
    {
      name: "Community badge / verified status",
      free: false,
      premium: true,
    },
    {
      name: "Advanced analytics and insights", // Extra row to hit the 6-8 requirement
      free: false,
      premium: true,
    },
  ];

  // Helper function to render table cells cleanly
  const renderCell = (value) => {
    if (typeof value === "string") {
      return <span className="font-medium text-base-content">{value}</span>;
    }
    return value ? (
      <FaCheck className="text-success text-xl mx-auto" />
    ) : (
      <FaTimes className="text-base-300 text-xl mx-auto" />
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Choose Your Growth Plan
        </h2>
        <p className="text-base-content/70 max-w-xl mx-auto">
          Start for free, or upgrade to Premium for a lifetime of unrestricted
          access, community perks, and an ad-free experience.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            {/* Table Header */}
            <thead>
              <tr className="bg-base-200/50 text-lg">
                <th className="text-left w-1/2 p-6 font-bold text-base-content">
                  Features
                </th>
                <th className="p-6">
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-bold text-base-content">Free</span>
                    <span className="text-sm font-normal text-base-content/70">
                      ৳0 / forever
                    </span>
                    <button className="btn btn-outline btn-sm mt-2 w-full max-w-[120px] pointer-events-none">
                      Current Plan
                    </button>
                  </div>
                </th>
                <th className="p-6 bg-primary/10 border-l border-primary/20">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">Premium</span>
                      <div className="badge badge-primary badge-sm">PRO</div>
                    </div>
                    <span className="text-sm font-bold text-base-content">
                      ৳1500{" "}
                      <span className="font-normal text-base-content/70">
                        / one-time
                      </span>
                    </span>
                    <form action="/api/checkout_sessions" className="btn btn-primary btn-sm mt-2 w-full max-w-[120px]" method="POST">
                      <section>
                        <button type="submit" role="link">
                          Upgrade Now
                        </button>
                      </section>
                    </form>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="hover">
                  <td className="text-left p-6 font-medium text-base-content/80">
                    {feature.name}
                  </td>
                  <td className="p-6">{renderCell(feature.free)}</td>
                  <td className="p-6 bg-primary/5 border-l border-primary/10">
                    {renderCell(feature.premium)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
