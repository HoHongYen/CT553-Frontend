import { lazy, Suspense } from "react";
import Spinner from "./Spinner";

const SuspenseWrapper = ({ path }) => {
  const LazyComponent = lazy(() => import(`/src/${path}`));

  return (
    <Suspense fallback={<Spinner />}>
      <LazyComponent />
    </Suspense>
  );
};

export default SuspenseWrapper;
