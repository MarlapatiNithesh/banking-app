"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import Footer from "./Footer";

const MobileNavPannel = forwardRef(function MobileNavPannel({ className,onLinkClick,user }, ref) {
  const pathname = usePathname();

  return (
    <div
      ref={ref}
      className={`fixed pl-3 top-0 left-0 flex flex-col justify-between z-50 h-screen w-[264px] border-none bg-white transition-transform duration-300 ease-in-out ${className}`}
    >
      <nav className="flex flex-col gap-6 p-4">
        {/* Logo */}
        <Link onClick={onLinkClick} href="/" className="flex items-center gap-2 mb-6">
          <Image
            src="/icons/logo.svg"
            alt="Horizon logo"
            width={24}
            height={24}
            className="size-6 max-xl:size-5"
          />
          <h1 className="text-xl font-semibold text-black">Horizon</h1>
        </Link>

        {/* Sidebar Links */}
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.Route || pathname.startsWith(`${link.Route}/`);

          return (
            <Link onClick={onLinkClick}
              href={link.Route}
              key={link.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 ${
                isActive ? "bg-bank-gradient" : ""
              }`}
            >
              <div className="relative size-6">
                <Image
                  src={link.image}
                  alt={link.label}
                  fill
                  className={`object-contain ${
                    isActive ? "brightness-[3] invert-0" : "brightness-50"
                  }`}
                />
              </div>
              <span
                className={`text-base font-medium ${
                  isActive ? "!text-white" : "text-gray-700"
                }`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
        USER
      </nav>
      <Footer user={user} type="mobile" />
    </div>
  );
});

export default MobileNavPannel;
