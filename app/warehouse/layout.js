import WarehouseAuthGuard from "@/src/components/warehouse/WarehouseAuthGuard";
import WarehousePortalWrapper from "@/src/components/warehouse/WarehousePortalWrapper";

export const metadata = {
  title: "Warehouse Dashboard | CC Matting",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WarehouseLayout({ children }) {
  return (
    <WarehouseAuthGuard>
      <WarehousePortalWrapper>{children}</WarehousePortalWrapper>
    </WarehouseAuthGuard>
  );
}
