"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;


  const handleSignOut = async() => {
    await authClient.signOut();
  }

  const listItems = (
    <>
      <li className="hover:bg-[#355dcb] rounded-md font-semibold hover:text-white">
        <Link href={"/"}>Home</Link>
      </li>
      <li className="hover:bg-[#355dcb] rounded-md font-semibold hover:text-white">
        <Link href={"/add-lessons"}>Add Lesson</Link>
      </li>
      <li className="hover:bg-[#355dcb] rounded-md font-semibold hover:text-white">
        <Link href={"/my-lessons"}>My Lessons</Link>
      </li>
      <li className="hover:bg-[#355dcb] rounded-md font-semibold hover:text-white">
        <Link href={"/lessons"}>Lessons</Link>
      </li>
      <li className={`hover:bg-[#355dcb] rounded-md font-semibold hover:text-white ${user?.plan === "premium" ? "hidden" : "block"}`}>
        <Link href={"/pricing-plan"}>Pricing / Upgrade</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2"
            >
              {listItems}
            </ul>
          </div>
          <Link href={"/"} className="text-xl font-bold text-[#355dcb]">
            Digital Life Lessons
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{listItems}</ul>
        </div>
        <div className="navbar-end gap-4 items-center px-4">
          {user ? (
            <div className="flex gap-5 items-center">
              <button className={`btn btn-info ${user?.plan === "premium" ? "block" : "hidden"} text-white font-bold rounded-2xl`}>Premium</button>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <Image src={user?.image} alt={user?.name} width={40} height={40} />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <h1 className="text-lg font-semibold text-[#355dcb] p-2">
                    {user?.name}
                  </h1>
                  <li>
                    <Link href={"/"} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}>DashBoard</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href={"/sign-up"}>
              <button className="btn btn-outline bg-[#355dcb] text-white font-semibold">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
