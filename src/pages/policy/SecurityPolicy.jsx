import { useSecurityPolicy } from "@/hooks/policies/useSecurityPolicy";
import { Helmet } from "react-helmet";
import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import Empty from "@/components/ui/Empty";

function SecurityPolicy() {
  const { isLoading, securityPolicy } = useSecurityPolicy();
  if (isLoading) return <Skeleton active />;

  return (
    <div className="flex flex-col gap-8">
      <Helmet>
        <title>Chính sách bảo mật</title>
      </Helmet>
      <Heading as="h1">Chính sách bảo mật</Heading>
      {
        !securityPolicy ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Empty description="Hiện chưa có chính sách" />
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: securityPolicy.content }}
          />
        )
      }
    </div>
  );
}

export default SecurityPolicy;
