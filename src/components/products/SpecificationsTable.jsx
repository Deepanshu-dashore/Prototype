import { CheckIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageZoom from "@/src/components/ui/ImageZoom";
import { useState } from "react";
import { useEffect } from "react";

export default function SpecificationsTable() {
    const specifications = [
        {
            matType: "WorkSafe",
            images: [
                "/assets/products Page/SpecificationImg.png",
                "/assets/products Page/SpecificationImg2.png"
            ],
            trafficSuitability: "Pedestrian & Light Trolley Traffic",
            color: "blue",
            specs: [
                { width: "1 m", length: "0.6 m", thickness: "2.4 mm" },
                { width: "1 m", length: "1.2 m", thickness: "2.4 mm" },
                { width: "1 m", length: "1.5 m", thickness: "2.4 mm" },
                { width: "2 m", length: "1 m", thickness: "2.4 mm" },
            ]
        }
    ];

    const [activeSpec, setActiveSpec] = useState(specifications[0]?.images[0]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveSpec((prevSpec) => {
                const currentIndex = specifications[0].images.indexOf(prevSpec);
                const nextIndex = (currentIndex + 1) % specifications[0].images.length;
                return specifications[0].images[nextIndex];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="space-y-12">
                {specifications.map((mat, matIdx) => (
                    <motion.div
                        key={matIdx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: matIdx * 0.2 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col lg:grid lg:grid-cols-12">
                            {/* Product Showcase Column */}
                            <div className="lg:col-span-5 bg-white p-6 lg:p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                                <div className="relative w-full aspect-4/3 max-w-xs mb-8 group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                                    <ImageZoom src={activeSpec.replace(/ /g, '%20')} alt={mat.matType}>
                                        <Image
                                            src={activeSpec.replace(/ /g, '%20')}
                                            alt={mat.matType}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            priority
                                        />
                                    </ImageZoom>
                                    <div className="text-center left-1/2 -translate-x-1/2 absolute z-10 -bottom-10">
                                        <div className="flex items-center gap-2 py-2 justify-center mb-6">
                                            {mat.images.map((image, imageIdx) => (
                                                <motion.button
                                                    key={imageIdx}
                                                    onClick={() => setActiveSpec(image)}
                                                    className={`h-2 rounded-full transition-all duration-200 ease-in-out ${activeSpec === image ? 'bg-indigo-400 w-6' : 'bg-gray-300 w-2'}`}
                                                    whileTap={{ scale: 0.9 }}
                                                    animate={{ scale: activeSpec === image ? 1 : 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                    exit={{ scale: 0.8 }}
                                                />
                                            ))}
                                        </div>
                                        {/* <h4 className="text-lg font-bold text-neutral-900 mb-1">{mat.matType}</h4> */}
                                        <div className="inline-flex text-nowrap items-center gap-2 px-3 py-1 bg-primary text-white rounded-sm text-[10px] font-bold uppercase tracking-wider">
                                            {mat.trafficSuitability}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Data Table Column */}
                            <div className="lg:col-span-7 flex flex-col py-2">
                                <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                                    <h5 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Technical Configuration</h5>
                                    {/* <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">ISO CLASS 3-9</span> */}
                                </div>
                                {/* Data Table (Refined Grid) */}
                                <div className="border border-gray-200/50 overflow-hidden">
                                    {/* Grid Header */}
                                    <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200 bg-gray-200/80">
                                        <div className="px-6 py-3 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Width</div>
                                        <div className="px-6 py-3 text-[10px] font-bold text-neutral-500 uppercase tracking-wider text-center">Length</div>
                                        <div className="px-6 py-3 text-[10px] font-bold text-neutral-500 uppercase tracking-wider text-right">Thickness</div>
                                    </div>

                                    {/* Grid Body */}
                                    <div className="divide-y divide-gray-200">
                                        {mat.specs.map((spec, specIdx) => (
                                            <div key={specIdx} className="grid grid-cols-3 divide-x divide-gray-200 hover:bg-gray-50/30 transition-colors">
                                                <div className="px-6 py-2.5 flex items-center">
                                                    <span className="text-sm font-semibold text-neutral-700">{spec.width}</span>
                                                </div>
                                                <div className="px-6 py-2.5 flex items-center justify-center">
                                                    <span className="text-sm font-semibold text-neutral-700">{spec.length}</span>
                                                </div>
                                                <div className="px-6 py-2.5 flex items-center justify-end">
                                                    <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold ${matIdx === 0 ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                                        {spec.thickness}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Enhanced Attributes Section (Refined) */}
                                {/* <div className="p-5 grid grid-cols-2 gap-4 bg-gray-50/20 border-t border-gray-200 border-b lg:border-b-0">
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-tight">Antimicrobial Efficiency</p>
                                        <p className="text-[11px] font-semibold text-neutral-600">Silver-Ion infused (Up to 99% effective)</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-tight">Environment</p>
                                        <p className="text-[11px] font-semibold text-neutral-600">Zero VOC / RoHS Compliant</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-tight">ESD Compliance</p>
                                        <p className="text-[11px] font-semibold text-neutral-600">Surface Resistance 10⁸ - 10⁹ Ω</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-tight">Maintenance</p>
                                        <p className="text-[11px] font-semibold text-neutral-600">Detergent/Water Washable</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
