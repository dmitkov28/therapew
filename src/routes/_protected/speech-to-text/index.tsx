import Upload from "@/components/Upload";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/speech-to-text/")({
  component: () => (
    <div className="w-full flex h-screen md:p-12 p-3">
      <div className="flex flex-grow md:justify-between justify-center items-center mb-4 flex-wrap gap-y-8 md:gap-y-0">
        <Upload />
      </div>
    </div>
  ),
});
