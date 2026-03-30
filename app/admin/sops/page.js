import SOPsContainer from "@/src/components/SOPs/SOPsContainer";

export const metadata = {
  title: "CRM Specialist SOPs | Admin Dashboard | CC Matting",
  description: "Standard Operating Procedures for CRM Specialists at CC Matting.",
};

export default function SOPsPage() {
  return (
    <div className="bg-white min-h-screen">
       <SOPsContainer />
    </div>
  );
}
