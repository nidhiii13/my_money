import { Suspense } from "react";
import DotPulse from "../../design/Loaders/DotPulse";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<DotPulse />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
