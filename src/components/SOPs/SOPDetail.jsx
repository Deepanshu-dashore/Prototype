"use client";

import Image from "next/image";
import ImageZoom from "@/src/components/ui/ImageZoom";

const SOPDetail = ({ sop, onBack, onSelect, sops, activeFilter }) => {
   return (
      <div className="min-h-screen bg-white">
         {/* Top Nav Bar */}
         <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 md:px-16 py-3 flex items-center justify-between">
            <button
               onClick={onBack}
               className="flex items-center gap-2 text-[13px] text-gray-400 hover:text-gray-900 transition-colors group"
            >
               <svg className="group-hover:-translate-x-0.5 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
               <span>{sops.portalInfo?.title}</span>
            </button>
            <button
               onClick={onBack}
               className="flex items-center gap-2 text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full"
            >
               ← Back
            </button>
         </div>

         {/* Page Content */}
         <div className="max-w-5xl mx-auto px-6 md:px-8 pt-14 pb-32">

            {/* SOP Code Badge */}
            <div className="mb-5">
               <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400 font-mono">{sop.sopCode}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-[2.4rem] font-bold text-gray-900 leading-tight tracking-tight mb-5">
               {sop.name}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 text-xs text-gray-500">
               {/* Module Tag */}
               <span className="inline-flex items-center gap-1.5 bg-gray-200 text-gray-700 font-semibold px-2.5 py-1 rounded-sm text-[12px] border border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                  {sop.department}
               </span>

               <span className="text-gray-200 hidden md:inline">|</span>

               {/* Last Updated */}
               <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
                  Updated {sop.lastUpdate}
               </span>

               {sop.updateRequired && (
                  <>
                     <span className="text-gray-200 hidden md:inline">|</span>
                     <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block"></span>
                        Revision Pending
                     </span>
                  </>
               )}
            </div>

            {/* Update Notes Callout */}
            {sop.updateDetails && (
               <div className="mb-10 flex items-start gap-3 bg-slate-100 border border-gray-100 rounded-xl px-4 py-3">
                  <svg className="text-gray-500 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 24 24">
                     <path fill="currentColor" d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1c-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29c-3.51 3.48-9.21 3.48-12.72 0c-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3zM12.5 8v4.25l3.5 2.08l-.72 1.21L11 13V8z"></path>
                  </svg>
                  <p className="text-[13px] text-gray-800 leading-relaxed">
                     <span className="font-bold">Update Note: </span>{sop.updateDetails}
                  </p>
               </div>
            )}

            {/* Short & Long Description Section */}
            {(sop.shortDescription || sop.longDescription) && (
               <div className="mb-12 border-b border-gray-100 pb-10">
                  {sop.shortDescription && (
                     <p className="text-[17px] font-semibold text-gray-900 leading-relaxed mb-4">
                        {sop.shortDescription}
                     </p>
                  )}
                  {sop.longDescription && (
                     <p className="text-[15.5px] text-gray-500 leading-[1.8] font-normal">
                        {sop.longDescription}
                     </p>
                  )}
               </div>
            )}

            {/* ─── Content Sections ─── */}
            <div className="space-y-14">

            {/* Gallery with Reusable ImageZoom */}
            {sop.content.images && sop.content.images.length > 0 && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sop.content.images.map((img, idx) => (
                     <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-slate-50">
                        <ImageZoom src={img} alt={`SOP Visual ${idx + 1}`} zoomLevel={2.2}>
                           <div className="relative w-full h-full min-h-[300px]">
                              <Image 
                                 src={img} 
                                 alt={`SOP Visual ${idx + 1}`} 
                                 fill 
                                 className="object-cover"
                                 sizes="(max-width: 768px) 100vw, 50vw"
                              />
                           </div>
                        </ImageZoom>
                     </div>
                  ))}
               </div>
            )}

               {/* Purpose */}
               <section>
                  <div className="flex items-center gap-3 mb-4">
                     <h2 className="text-lg font-bold text-gray-700 capitalize">Purpose</h2>
                  </div>
                  <p className="text-[15.5px] text-gray-700 leading-[1.75] pl-4">
                     {sop.content.purpose}
                  </p>
               </section>

               <div className="border-t border-gray-100"></div>

               {/* Scope */}
               <section>
                  <div className="flex items-center gap-3 mb-4">
                     <h2 className="text-lg font-bold text-gray-700 capitalize">Scope</h2>
                  </div>
                  <p className="text-[15.5px] text-gray-700 leading-[1.75] pl-4">
                     {sop.content.scope}
                  </p>
               </section>


               {/* Related SOPs - Filtered by scope */}
               {(() => {
                  const filteredRelated = (sop.relatedSOPs || []).filter(related => {
                     const relatedFull = (sops.sops || []).find(s => s.id === related.id);
                     if (!relatedFull) return false;
                     if (activeFilter === "Warehouse") {
                        return relatedFull.department?.toLowerCase().includes("warehouse");
                     }
                     return true;
                  });

                  if (filteredRelated.length === 0) return null;

                  return (
                     <>
                        <div className="border-t border-gray-100"></div>
                        <section>
                           <div className="flex items-center gap-3 mb-5">
                              <h2 className="text-lg font-bold text-gray-700 capitalize">Primary Related Procedures</h2>
                           </div>
                           <div className="pl-4 flex flex-wrap gap-2">
                              {filteredRelated.map(related => (
                                 <button
                                    key={related.id}
                                    onClick={() => {
                                       const found = sops.sops.find(s => s.id === related.id);
                                       if (found) onSelect(found);
                                    }}
                                    className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 text-gray-700 hover:text-indigo-700 text-[13px] font-medium px-3 py-1.5 rounded-full transition-all"
                                 >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                                    {related.name}
                                 </button>
                              ))}
                           </div>
                        </section>
                     </>
                  );
               })()}

               <div className="border-t border-gray-100"></div>

               {/* Steps */}
               <section>
                  <div className="flex items-center gap-3 mb-8">
                     <h2 className="text-lg font-bold text-gray-700 capitalize">Procedure Steps</h2>
                  </div>

                  <ol className="space-y-0">
                     {sop.content.steps.map((step, index) => (
                        <li key={index} className="relative flex gap-5 group pb-10 last:pb-0">
                           {/* Vertical connector line */}
                           <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-md bg-gray-300 flex items-center justify-center text-[12px] font-bold text-gray-700 transition-all shrink-0 z-10">
                                 {index + 1}
                              </div>
                              {index < sop.content.steps.length - 1 && (
                                 <div className="w-px flex-1 bg-gray-100 mt-1 transition-colors"></div>
                              )}
                           </div>
                           {/* Step Content */}
                           <div className="flex-1 pt-1 pb-2">
                              <p className="text-[15.5px] text-gray-800 font-medium leading-relaxed">
                                 {step}
                              </p>
                           </div>
                        </li>
                     ))}
                  </ol>
               </section>

            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-gray-100 flex items-center justify-between">
               <span className="text-[12px] text-gray-400">© 2026 CC Matting Operations</span>
               <span className="text-[11px] font-mono text-gray-300 uppercase tracking-widest">{sop.sopCode}</span>
            </div>

         </div>
      </div>
   );
};

export default SOPDetail;
