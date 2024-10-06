import { useCheckProductPolicy } from "@/hooks/policies/useCheckProductPolicy";
import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import Empty from "@/components/ui/Empty";

function CheckProductPolicy() {
  const { isLoading, checkProductPolicy } = useCheckProductPolicy();
  if (isLoading) return <Skeleton active />;

  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Chính sách kiểm hàng</Heading>
      {
        !checkProductPolicy ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Empty description="Hiện chưa có chính sách" />
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: checkProductPolicy.content }}
          />
        )
      }
    </div>
  );
}

export default CheckProductPolicy;
