
import Spinner from "@/components/Spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/experiments")({
  component: () => <Querying />,
});

const Querying = () => {

  return (
    <div className="p-12">
     <Spinner/>
    </div>
  );
};
