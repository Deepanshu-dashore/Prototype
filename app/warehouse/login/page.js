import WarehouseLoginContent from "../../../src/components/auth/WarehouseLoginContent";

export const metadata = {
  title: "Warehouse Login | CC Matting",
  description: "Secure login for CC Matting warehouse management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WarehouseLoginPage() {
  return <WarehouseLoginContent />;
}
