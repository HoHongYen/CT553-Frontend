import { useDeliveryPolicy } from "@/hooks/policies/useDeliveryPolicy";
import { Skeleton } from "antd";
import { Helmet } from "react-helmet";
import Heading from "@/components/ui/Heading";
import Empty from "@/components/ui/Empty";

function DeliveryPolicy() {
  const { isLoading, deliveryPolicy } = useDeliveryPolicy();
  if (isLoading) return <Skeleton active />;

  return (
    <div className="flex flex-col gap-8">
      <Helmet>
        <title>Chính sách giao hàng</title>
      </Helmet>
      <Heading as="h1">Chính sách giao hàng</Heading>
      {
        !deliveryPolicy ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Empty description="Hiện chưa có chính sách" />
          </div>
        ) : (

          <div
            dangerouslySetInnerHTML={{ __html: deliveryPolicy.content }}
          />
        )
      }
    </div>
  );
}

export default DeliveryPolicy;
