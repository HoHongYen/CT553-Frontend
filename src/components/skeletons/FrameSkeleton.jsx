import { Skeleton } from "antd";

function FrameSkeleton() {
  return (
    <Skeleton
      avatar
      paragraph={{
        rows: 4,
      }}
    />
  );
}

export default FrameSkeleton;
