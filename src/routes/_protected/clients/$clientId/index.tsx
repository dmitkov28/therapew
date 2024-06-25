import Dialog from "@/components/DeleteDialog";
import NotFound from "@/components/NotFound";
import SessionDialog from "@/components/SessionDialog";
import { getClient } from "@/lib/data";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  BriefcaseIcon,
  CalendarClockIcon,
  CalendarIcon,
  CoinsIcon,
  MailIcon,
  PhoneIcon,
  SofaIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

const ClientDetails = () => {
  const client = Route.useLoaderData();
  const [openSessionDialog, setOpenSessionDialog] = useState(false);

  return (
    <div className="flex w-full flex-col space-y-4 mb-6">
      <div className="pt-12 md:px-12 px-2 w-full">
        <div className="p-8 border rounded-md w-full">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-3xl font-bold inline-flex items-center gap-3 pb-4 flex-wrap">
              <UserIcon className="text-emerald-600 md:block hidden" />{" "}
              {client.name}
            </h1>
            <div className="inline-flex gap-4 flex-wrap w-full md:w-fit">
              <Link
                className="border w-full md:w-fit border-emerald-600 text-emerald-600 text-center px-2 py-1 rounded-md"
                to="/clients/$clientId/edit"
                params={{ clientId: client.id }}
              >
                Редактиране
              </Link>
              <Dialog client={client} />
            </div>
          </div>
          <hr />

          <div className="inline-flex gap-8 mt-8 flex-wrap">
            {client.age && (
              <div className="inline-flex items-center gap-2 hover:text-emerald-600">
                <CalendarClockIcon color="#059669" /> {client.age} г.
              </div>
            )}
            {client.email && (
              <div className="inline-flex items-center gap-2 hover:text-emerald-600">
                <MailIcon color="#059669" />{" "}
                <a href={`mailto:${client.email}`}>{client.email}</a>
              </div>
            )}
            {client.phone && (
              <div className="inline-flex items-center gap-2">
                <PhoneIcon color="#059669" />
                <a href={`tel:${client.phone}`}>{client.phone}</a>
              </div>
            )}

            {typeof client.fee === "number" && (
              <div className="inline-flex items-center gap-2">
                <CoinsIcon color="#059669" />
                {client.fee} лв.
              </div>
            )}

            {client.occupation && (
              <div className="inline-flex items-center gap-2">
                <BriefcaseIcon color="#059669" />
                {client.occupation}
              </div>
            )}
          </div>

          <blockquote className="p-4 my-8 border-s-4 border-gray-300 bg-gray-50">
            <p className="text-xl italic leading-relaxed text-gray-900">
              {client.facts || `Още няма добавени факти за ${client.name}`}
            </p>
          </blockquote>
        </div>
      </div>

      <div className="md:px-12 px-2 w-full">
        <div className="p-8 border rounded-md w-full">
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="text-3xl font-bold inline-flex items-center  gap-3 pb-4 flex-wrap">
              <SofaIcon className="text-emerald-600 md:block hidden" />
              Сесии
            </h1>
            <SessionDialog
              open={openSessionDialog}
              setOpen={setOpenSessionDialog}
              clientId={client.id}
            />
          </div>
          <hr />

          <div className="inline-flex gap-8 mt-8"></div>
          {client.session.length ? (
            client.session.map((session) => (
              <div key={session.id} className="space-y-3 mb-24">
                <Link
                  to="/sessions/$sessionId"
                  params={{ sessionId: session.id }}
                >
                  <h2 className="text-slate-500 hover:text-slate-700 font-bold inline-flex items-center gap-3">
                    <CalendarIcon color="#059669" />
                    {session.date}
                  </h2>
                </Link>
                <blockquote className="p-4 border-s-4 border-gray-300 bg-gray-50">
                  <p className="text-xl italic leading-relaxed text-gray-900">
                    {session.notes}
                  </p>
                </blockquote>
              </div>
            ))
          ) : (
            <p className="text-center">Няма сесии.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_protected/clients/$clientId/")({
  loader: async ({ params: { clientId } }) => getClient(clientId),
  notFoundComponent: () => {
    return <p>Няма такъв клиент.</p>;
  },
  component: ClientDetails,
  errorComponent: () => <NotFound />,
  staleTime: Infinity,
});
