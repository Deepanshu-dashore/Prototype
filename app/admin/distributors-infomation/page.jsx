"use client";

import DistributorList from "@/src/components/admin/distributors-information-admin/DistributorList";
import React from "react";


// ======================================================
// ADMIN DISTRIBUTOR PAGE
// ======================================================

export default function DistributorsAdminPage() {
  return (
    <main
      className="
        min-h-screen
        bg-[#F1F4FC]
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-[1600px]
        "
      >
        <DistributorList />
      </div>
    </main>
  );
}