"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import MobileNavPannel from "./MobileNavPannel";

const MobileNav = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    if (isOpen) {
      gsap.to(panelRef.current, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(panelRef.current, {
        x: "-100%",
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <section className="w-full max-w-[264px]">
      <button onClick={toggleNav}>
        <Image src="/icons/hamburger.svg" alt="hamburger" width={30} height={30}className="cursor-pointer"/>
      </button>

      <MobileNavPannel
        user={user}
        ref={panelRef}
        onLinkClick={() => setIsOpen(false)}
        className="fixed top-0 left-0 h-screen w-[264px] bg-white -translate-x-full invisible z-50"
      />
    </section>
  );
};

export default MobileNav;
