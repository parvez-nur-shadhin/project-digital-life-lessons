
import Link from "next/link";
import { FaCrown } from "react-icons/fa";

const MoreThanThree = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center text-center p-8 bg-warning/10 border border-warning/30 rounded-2xl gap-4 my-4 animate-fade-in">
        <div className="p-4 bg-warning/20 rounded-full text-warning text-4xl">
          <FaCrown />
        </div>
        <div>
          <h3 className="font-bold text-xl text-base-content">
            Free Plan Limit Reached
          </h3>
          <p className="text-sm text-base-content/70 max-w-md mt-2">
            You've successfully created 3 lessons! Free accounts are
            limited to a maximum of 3 posts. Upgrade to Premium
            for unlimited access.
          </p>
        </div>
        <Link
          href={"/pricing-plan"}
          className="btn btn-warning shadow-md mt-2 normal-case"
        >
          Upgrade to Premium
        </Link>
      </div>
    </div>
  );
};

export default MoreThanThree;
