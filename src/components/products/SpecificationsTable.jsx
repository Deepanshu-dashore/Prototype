import { CheckIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function SpecificationsTable() {
    const specifications = [
        {
            matType: "WorkSafe",
            image: "/assets/products Page/worksafe-mat.png",
            trafficSuitability: "Pedestrian & Light Trolley Traffic",
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
            specs: [
                { width: "1 m", length: "1.2 m", thickness: "3 mm" },
                { width: "1 m", length: "1.5 m", thickness: "3 mm" },
                { width: "2 m", length: "1 m", thickness: "3 mm" },
            ]
        }
    ];

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="p-4 text-left font-semibold text-sm border border-primary">Mat Type</th>
                        <th className="p-4 text-center font-semibold text-sm border border-primary">Traffic Suitability</th>
                        <th className="p-4 text-center font-semibold text-sm border border-primary">Width</th>
                        <th className="p-4 text-center font-semibold text-sm border border-primary">Length</th>
                        <th className="p-4 text-center font-semibold text-sm border border-primary">Thickness</th>
                    </tr>
                </thead>
                <tbody>
                    {specifications.map((mat, matIdx) => (
                        mat.specs.map((spec, specIdx) => (
                            <tr key={`${matIdx}-${specIdx}`} className="hover:bg-neutral-50 transition-colors">
                                {specIdx === 0 && (
                                    <>
                                        <td
                                            rowSpan={mat.specs.length}
                                            className="p-6 border border-neutral-200 bg-neutral-50 align-middle"
                                        >
                                            <div className="flex flex-col items-center gap-3 h-36">
                                                <div className="relative w-48 h-48">
                                                    <Image
                                                        src={mat.image}
                                                        alt={mat.matType}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <span className="font-semibold text-base absolute bottom-0 left-1/2 -translate-x-1/2 z-20 text-neutral-900">{mat.matType}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            rowSpan={mat.specs.length}
                                            className="p-4 text-center border border-neutral-200 bg-neutral-50 align-middle font-medium text-sm text-neutral-700"
                                        >
                                            {mat.trafficSuitability}
                                        </td>
                                    </>
                                )}
                                <td className="p-4 text-center border border-neutral-200 bg-white text-sm text-neutral-700 font-medium">
                                    {spec.width}
                                </td>
                                <td className="p-4 text-center border border-neutral-200 bg-white text-sm text-neutral-700 font-medium">
                                    {spec.length}
                                </td>
                                <td className="p-4 text-center border border-neutral-200 bg-white text-sm text-neutral-700 font-medium">
                                    {spec.thickness}
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
}
