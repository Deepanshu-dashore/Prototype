import { CheckIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SpecificationsTable() {
    const specifications = [
        {
            matType: "WorkSafe",
            image: "/assets/products Page/worksafe-mat.png",
            trafficSuitability: "Pedestrian & Light Trolley Traffic",
            color: "blue",
            specs: [
                { width: "1 m", length: "0.6 m", thickness: "2.4 mm" },
                { width: "1 m", length: "1.2 m", thickness: "2.4 mm" },
                { width: "1 m", length: "1.5 m", thickness: "2.4 mm" },
                { width: "2 m", length: "1 m", thickness: "2.4 mm" },
            ]
        },
        {
            matType: "HeavyDuty",
            image: "/assets/products Page/Gemini_Generated_Image_tpu0cbtpu0cbtpu0.png",
            trafficSuitability: "Mobile Pallet Trucks",
            color: "indigo",
            specs: [
                { width: "1 m", length: "1.2 m", thickness: "3 mm" },
                { width: "1 m", length: "1.5 m", thickness: "3 mm" },
                { width: "2 m", length: "1 m", thickness: "3 mm" },
            ]
        }
    ];

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
                        className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col lg:grid lg:grid-cols-12">
                            {/* Product Showcase Column */}
                            <div className="lg:col-span-5 bg-linear-to-br from-gray-50 to-white p-6 lg:p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                                <div className="relative w-full aspect-video max-w-xs mb-4 group">
                                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                                    <Image
                                        src={mat.image}
                                        alt={mat.matType}
                                        fill
                                        className="object-contain transform group-hover:scale-105 transition-transform duration-500 z-10"
                                    />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-neutral-900 mb-1">{mat.matType}</h4>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        {mat.trafficSuitability}
                                    </div>
                                </div>
                            </div>

                            {/* Data Table Column */}
                            <div className="lg:col-span-7 flex flex-col py-2">
                                <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                                    <h5 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Technical Configuration</h5>
                                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">ISO CLASS 3-9</span>
                                </div>
                                <div className="overflow-x-auto grow border-b border-gray-50">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-left">
                                                <th className="px-6 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider border-r border-gray-100">Width</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider border-r border-gray-100">Length</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-right">Profile</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {mat.specs.map((spec, specIdx) => (
                                                <tr key={specIdx} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-6 py-3 border-r border-b border-gray-50">
                                                        <span className="text-sm font-semibold text-neutral-700">{spec.width}</span>
                                                    </td>
                                                    <td className="px-6 py-3 border-r border-b border-gray-50">
                                                        <span className="text-sm font-semibold text-neutral-700">{spec.length}</span>
                                                    </td>
                                                    <td className="px-6 py-3 text-right border-b border-gray-50">
                                                        <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold ${matIdx === 0 ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                                            {spec.thickness} (T)
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Enhanced Attributes Section */}
                                <div className="p-5 grid grid-cols-2 gap-4 bg-gray-50/10">
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-tight">Antimicrobial Efficiency</p>
                                        <p className="text-[11px] font-semibold text-neutral-600">Silver-Ion infused (99.9% effective)</p>
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
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
