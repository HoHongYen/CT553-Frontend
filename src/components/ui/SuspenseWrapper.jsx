import { lazy, Suspense } from "react";
import Spinner from "./Spinner";

const SuspenseWrapper = ({ path, level1 = "" }) => {
  let LazyComponent;
  if (level1 !== "") {
    LazyComponent = lazy(() => import(`../../pages/${level1}/${path}.jsx`));
  } else LazyComponent = lazy(() => import(`../../pages/${path}.jsx`));

  return (
    <Suspense fallback={<Spinner />}>
      <LazyComponent />
    </Suspense>
  );
};

export default SuspenseWrapper;
