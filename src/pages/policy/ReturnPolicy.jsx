import { useReturnPolicy } from "@/hooks/policies/useReturnPolicy";
import { Helmet } from "react-helmet";
import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import Empty from "@/components/ui/Empty";

function ReturnPolicy() {
  const { isLoading, returnPolicy } = useReturnPolicy();
  if (isLoading) return <Skeleton active />;

  return (
    <div className="flex flex-col gap-8">
      <Helmet>
        <title>Chính sách đổi trả</title>
      </Helmet>
      <Heading as="h1">Chính sách đổi trả</Heading>
      {
        !returnPolicy ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Empty description="Hiện chưa có chính sách" />
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: returnPolicy.content }}
          />
        )
      }
    </div>
  );
}

export default ReturnPolicy;
