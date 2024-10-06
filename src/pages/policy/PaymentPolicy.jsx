import { usePaymentPolicy } from "@/hooks/policies/usePaymentPolicy";
import { Helmet } from "react-helmet";
import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import Empty from "@/components/ui/Empty";

function PaymentPolicy() {
  const { isLoading, paymentPolicy } = usePaymentPolicy();
  if (isLoading) return <Skeleton active />;

  return (
    <div className="flex flex-col gap-8">
      <Helmet>
        <title>Chính sách thanh toán</title>
      </Helmet>
      <Heading as="h1">Chính sách thanh toán</Heading>
      {
        !paymentPolicy ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Empty description="Hiện chưa có chính sách" />
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: paymentPolicy.content }}
          />
        )
      }
    </div>
  );
}

export default PaymentPolicy;
