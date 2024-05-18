import NotFound from "@/components/NotFound";
import SessionForm from "@/components/SessionForm";
import { addSession, getSession } from "@/lib/data";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_protected/sessions/$sessionId/")({
  loader: async ({ params }) => getSession(params.sessionId),
  component: () => <Session />,
  notFoundComponent: () => <NotFound />,
});

const Session = () => {
  const session = Route.useLoaderData();
  const router = useRouter();
  const navigate = useNavigate();
  const [sessionInput, setSessionInput] = useState({
    date: new Date(session.date),
    notes: session.notes ?? "",
  });

  const handleSubmit = async () => {
    await addSession({
      date: sessionInput.date.toISOString(),
      notes: sessionInput.notes,
      id: session.id,
    });
    await router.invalidate();

    navigate({
      to: "/clients/$clientId",
      params: { clientId: session.client_id! },
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center md:px-4 px-2">
      <div className="md:px-4 px-2 py-7 border rounded-md shadow-sm">
        <h1 className="font-bold text-xl text-emerald-600 text-center mb-4">
          Редактиране на сесия
        </h1>
        <SessionForm
          sessionInput={sessionInput}
          setSessionInput={setSessionInput}
        />
        <button
          onClick={handleSubmit}
          className="bg-emerald-600 text-white font-bold text-center rounded-md px-2 py-1 w-full mt-4"
        >
          Запази промените
        </button>
      </div>
    </div>
  );
};
