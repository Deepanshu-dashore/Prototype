"use client";

import React, { useState } from "react";
import SOPsList from "./SOPsList";
import SOPDetail from "./SOPDetail";
import sopsData from "../../data/json/sops.json";

export default function SOPsContainer({ initialFilter = "All", hideFilter = false }) {
  const [selectedSOP, setSelectedSOP] = useState(null);

  const handleSelectSOP = (sop) => {
    setSelectedSOP(sop);
  };

  const handleBack = () => {
    setSelectedSOP(null);
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#37352f] font-sans">
      {!selectedSOP ? (
        <SOPsList 
          sops={sopsData} 
          onSelect={handleSelectSOP} 
          initialFilter={initialFilter}
          hideFilter={hideFilter}
        />
      ) : (
        <SOPDetail 
          sop={selectedSOP} 
          onBack={handleBack} 
          onSelect={handleSelectSOP} 
          sops={sopsData} 
          activeFilter={initialFilter} 
        />
      )}
    </div>
  );
}
