"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/lockedin_logo.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { signIn } from "next-auth/react";

export const Header = () => {
  // Handle Google Sign-In
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" }); // Redirect to /dashboard after login
  };

  return (
<header className="sticky top-0 backdrop-blur-sm z-20">
    <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
      <p className="text-white/60 hidden md:block">Get productive, stay productive.</p>
    </div>

    <div className="py-5 bg-[#D2DCFF]">  {/* Added bg-[#D2DCFF] here */}
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={Logo} alt="LockedIn logo" height={40} width={40} />
            <p className="text-black/60">LockedIn AI</p>
          </div>
          <MenuIcon className="h-5 w-5 md:hidden" />
          <nav className="hidden md:flex gap-6 text-black/60 items-center ml-auto">
            {/* Sign In Button */}
            <button
              onClick={handleLogin} // Connect to Google authentication
              className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight"
            >
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </div>
  </header>
  );
};
