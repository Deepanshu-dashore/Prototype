"use client";

import React, { useState } from "react";
import Image from "next/image";

const SOPsList = ({ sops: sopsData, onSelect, initialFilter = "All", hideFilter = false }) => {
  const { portalInfo, sops } = sopsData;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const filteredSOPs = sops.filter(sop => {
    const matchesSearch = sop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sop.sopCode.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Warehouse") {
      return matchesSearch && sop.department?.toLowerCase().includes("warehouse");
    }
    return matchesSearch;
  });

  return (
    <div className="px-5 pt-10 mx-auto pb-20 max-w-7xl">
      {/* Header Image */}
      <div className="relative w-full h-48 md:h-44 overflow-hidden rounded-xl shadow-sm">
        <Image
          src="/distributor_profile_banner_1770291446716.png"
          alt="SOPs Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="px-6 md:px-12 -mt-10 relative z-10">
        {/* Page Icon */}
        <div className="bg-white p-2 rounded-full shadow-md inline-block">
          <Image
            src="/sops_stack_icon.png"
            alt="SOPs Stack"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>

        {/* Page Title & Context */}
        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#37352f] tracking-tight">{portalInfo?.title}</h1>
            <p className="mt-4 text-[#37352f] opacity-70 max-w-2xl leading-relaxed text-sm">
              {portalInfo?.description}
            </p>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search SOP Name..."
                className="pl-9 pr-4 py-2 border border-[#eee] rounded-full text-sm outline-none transition-all focus:border-blue-300 focus:ring-4 focus:ring-blue-50 group-hover:border-gray-300 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
            </div>
            <button className="p-2.5 hover:bg-gray-100 rounded-full transition text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5h10" /><path d="M11 9h10" /><path d="M11 13h10" /><path d="M11 17h10" /><rect width="4" height="4" x="3" y="5" rx="1" /><rect width="4" height="4" x="3" y="13" rx="1" /></svg>
            </button>
          </div>
        </div>

        {/* Tab-like styling with only Company SOPs as seen in image */}
        <div className="mt-12 flex items-center gap-6 border-b border-[#eee] pb-1">
          <div className="px-3 py-2 bg-[#f7f6f3] rounded-md text-sm font-semibold text-[#37352f] flex items-center gap-2 border border-[#eee]">
            <span className="opacity-60 text-xs">▦</span> Company SOPs
          </div>
          {!hideFilter && (
            <div className="ml-auto flex items-center gap-4">
              <div className="flex bg-[#f7f6f3] p-1 rounded-lg border border-[#eee]">
                <button
                  onClick={() => setActiveFilter("All")}
                  className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all ${activeFilter === "All"
                    ? "bg-white shadow-sm text-blue-600 scale-100"
                    : "text-gray-500 hover:text-black hover:bg-gray-200"
                    }`}
                >
                  All SOPs
                </button>
                <button
                  onClick={() => setActiveFilter("Warehouse")}
                  className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all ${activeFilter === "Warehouse"
                    ? "bg-white shadow-sm text-blue-600 scale-100"
                    : "text-gray-500 hover:text-black hover:bg-gray-200"
                    }`}
                >
                  Warehouse
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SOPs Simplified Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-[12px] text-gray-400 font-semibold border-b border-[#eee]">
                {/* <th className="py-4 px-2 w-[40px]">Icon</th> */}
                <th className="py-4 px-2">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="text-[10px] opacity-60">Aa</span> SOP Name
                  </span>
                </th>
                <th className="py-4 px-2">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="text-[14px] opacity-60">≡</span> Description
                  </span>
                </th>
                <th className="py-4 px-2">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="text-[14px] opacity-60">🕒</span> Last Update
                  </span>
                </th>
                <th className="py-4 px-2 text-right uppercase tracking-wider">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee]">
              {filteredSOPs.map((sop) => (
                <tr
                  key={sop.id}
                  className="group hover:bg-[#f7f6f3]/50 transition-colors"
                >
                  {/* <td className="py-5 px-2">
                    {sop.thumbnail && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-50 border border-[#eee] shadow-sm">
                        <Image
                          src={sop.thumbnail}
                          alt={sop.name}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </td> */}
                  <td className="py-5 px-2">
                    <span className="text-[14px] font-semibold text-[#37352f] truncate block max-w-[250px]">
                      {sop.name}
                    </span>
                    {/* <span className="text-[11px] text-blue-500 font-medium">{sop.sopCode}</span> */}
                  </td>
                  <td className="py-5 px-2">
                    <p className="text-[13px] text-[#37352f] opacity-70 leading-relaxed max-w-[350px]">
                      {sop.shortDescription}
                    </p>
                  </td>
                  <td className="py-5 px-2 text-[13px] text-gray-500 whitespace-nowrap">
                    {sop.lastUpdate}
                  </td>
                  <td className="py-5 px-2 text-right">
                    <button
                      onClick={() => onSelect(sop)}
                      className="inline-flex items-center gap-2 bg-gray-200 group/button px-4 py-1.5 rounded-sm text-xs font-semibold text-[#37352f] hover:bg-gray-300 shadow-sm transition-all transform active:scale-95"
                    >
                      View Procedure
                      <svg xmlns="http://www.w3.org/2000/svg" className="group-hover/button:-rotate-45 transition-all duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSOPs.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-gray-400 text-sm">
                    No SOPs found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="py-6 text-[12px] text-gray-400 font-medium">
          Total: {filteredSOPs.length} listing{filteredSOPs.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default SOPsList;
