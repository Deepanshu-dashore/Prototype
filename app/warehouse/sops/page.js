import SOPsContainer from "@/src/components/SOPs/SOPsContainer";

export const metadata = {
  title: "Warehouse Operations SOPs | CC Matting",
  description: "Standard Operating Procedures for Warehouse Operations at CC Matting.",
};

export default function SOPsPage() {
  return (
    <div className="bg-white min-h-screen">
       <SOPsContainer initialFilter="Warehouse" hideFilter={true} />
    </div>
  );
}
