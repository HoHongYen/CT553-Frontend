import { useWarrantyPolicy } from "@/hooks/policies/useWarrantyPolicy";
import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import Empty from "@/components/ui/Empty";

function WarrantyPolicy() {
  const { isLoading, warrantyPolicy } = useWarrantyPolicy();
  if (isLoading) return <Skeleton active />;

  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Chính sách bảo hành</Heading>
      {
        !warrantyPolicy ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Empty description="Hiện chưa có chính sách" />
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: warrantyPolicy.content }}
          />
        )
      }
    </div>
  );
}

export default WarrantyPolicy;
