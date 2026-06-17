import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="mx-auto w-full">
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mx-auto">
        <nav>
          <h1 className="text-3xl font-bold text-[#355dcb] mb-5">
            Digital Life Lessons
          </h1>
          <p className="max-w-100 justified font-medium text-gray-500">
            Digital Life Lessons is a space dedicated to capturing, organizing,
            and sharing the wisdom that shapes us. Together, we are building a
            living library of personal growth, insights, and human experience to
            inspire generations to come.
          </p>
        </nav>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social Links</h6>
          <div className="flex gap-3 items-center">
            <Link href={"/"} className="link link-hover">
              <FaFacebook size={25} />
            </Link>
            <Link href={"/"} className="link link-hover">
              <FaInstagram size={25} />
            </Link>
            <Link href={"/"} className="link link-hover">
              <FaX size={25} />
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
