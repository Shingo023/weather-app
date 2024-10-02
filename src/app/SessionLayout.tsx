"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <ToastContainer />
        {children}
      </SessionProvider>
    </>
  );
}
