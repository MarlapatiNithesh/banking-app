"use client";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const SideBar = ({user}) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-2 flex">
          <Image
            src="/icons/logo.svg"
            alt="Horizon logo"
            width={34}
            height={34}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>

        {/* Sidebar Links */}
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.Route || pathname.startsWith(`${link.Route}/`);
          return (
            <Link
              key={link.label}
              href={link.Route}
              className={`sidebar-link flex items-center gap-2 ${isActive ? "bg-bank-gradient" : ""}`}
            >
              <div className="relative size-6">
                <Image
                  src={link.image}
                  alt={link.label}
                  fill
                  className={`object-contain ${isActive ? "brightness-[3] invert-0" : "brightness-50"}`}
                />
              </div>
              <span className={`sidebar-label ${isActive?"!text-white":""}`}>{link.label}</span>
            </Link>
          );
        })}

        USER
      </nav>
      FOOTER
    </section>
  );
};

export default SideBar;
