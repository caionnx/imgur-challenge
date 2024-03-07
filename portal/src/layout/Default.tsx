import React, { ReactNode, useEffect, useState } from "react";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [stickyHeaderClass, setStickyHeaderClass] = useState("");

  useEffect(() => {
    const event = () => {
      if (window.scrollY > 180) {
        setStickyHeaderClass("translate-y-[-6.5rem] md:translate-y-[-4rem]");
      } else {
        setStickyHeaderClass("");
      }
    };
    window.addEventListener("scroll", event);

    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <>
      <header
        className={`relative sticky top-0 z-10 transition-transform duration-500 ${stickyHeaderClass}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-900"></div>
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-12 lg:pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1
              className={`text-3xl text-white font-extrabold tracking-tight text-slate-900 sm:text-4xl transition-transform duration-500 ${stickyHeaderClass ? "translate-y-[3.5rem] md:translate-y-[2.5rem]" : ""}`}
            >
              Portal
            </h1>
            <p
              className={`mt-2 text-sm font-semibold transition-opacity duration-250 ease-in-out text-white ${stickyHeaderClass ? "opacity-0" : ""}`}
            >
              Welcome to the best images of the internet!
            </p>
          </div>
        </div>
      </header>
      <main className="mb-14 p-6 md:p-12 lg:px-18 lg:py-8">{children}</main>
      <footer className="w-screen fixed bottom-0 bg-indigo-900 py-4 text-gray-100">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Made with ❤️ by Caio Nunes.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
