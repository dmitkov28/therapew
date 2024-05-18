import NotFound from "@/components/NotFound";
import { addClient, getClient } from "@/lib/data";
import { ClientSchema } from "@/schemas/schemas";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Route = createFileRoute("/_protected/clients/$clientId/edit/")({
  loader: async ({ params: { clientId } }) => getClient(clientId),
  component: () => (
    <div className="flex w-full items-center justify-center">
      <AddClientForm client={Route.useLoaderData()} />
    </div>
  ),

  errorComponent: () => <NotFound />,
});

export const AddClientForm = ({ client }: { client: ClientInsert }) => {
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState<{
    age?: string[] | undefined;
    name?: string[] | undefined;
    fee?: string[] | undefined;
    occupation?: string[] | undefined;
    facts?: string[] | undefined;
    phone?: string[] | undefined;
    email?: string[] | undefined;
  }>();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData);

    const formattedDataObject = {
      ...formDataObject,
      fee: parseInt(formDataObject.fee as string) || null,
      age: parseInt(formDataObject.age as string) || null,
      id: client.id,
    } as ClientInsert;

    const { success, error: validationError } =
      ClientSchema.safeParse(formattedDataObject);

    if (!success) {
      setErrorState(validationError.flatten().fieldErrors);
      return;
    }

    const data = await addClient(formattedDataObject);
    if (data) {
      navigate({ to: "/clients/$clientId", params: { clientId: data.id } });
    }
  };

  const errorClass = "border-red-500 placeholder-red-500";

  return (
    <form
      onChange={() => setErrorState(undefined)}
      onSubmit={handleSubmit}
      className="flex md:min-w-[600px] md:max-w-[600px] w-full flex-col space-y-4 rounded-md border shadow-sm p-8"
    >
      <h1 className="text-emerald-600 text-center font-bold">Нов клиент</h1>
      <div className="w-full">
        <input
          defaultValue={client.name}
          className={twMerge(
            `border rounded-md px-2 py-1 w-full`,
            errorState?.name?.length && errorClass
          )}
          type="text"
          placeholder="Име"
          name="name"
        />
        <span
          className={twMerge(
            `hidden text-sm text-red-500`,
            errorState?.name?.length && "block"
          )}
        >
          {errorState?.name?.length && errorState.name[0]}
        </span>
      </div>

      <input
        defaultValue={client.age ?? ""}
        className={`border rounded-md px-2 py-1`}
        type="number"
        placeholder="Възраст"
        name="age"
      />
      <input
        defaultValue={client.occupation ?? ""}
        className={twMerge(`border rounded-md px-2 py-1`)}
        type="text"
        placeholder="Професия"
        name="occupation"
      />
      <input
        defaultValue={client.email ?? ""}
        className={twMerge(`border rounded-md px-2 py-1`)}
        type="email"
        placeholder="Имейл"
        name="email"
      />
      <input
        defaultValue={client.phone ?? ""}
        className={twMerge(`border rounded-md px-2 py-1`)}
        type="text"
        placeholder="Телефон"
        name="phone"
      />
      <input
        defaultValue={client.fee ?? ""}
        className={twMerge(`border rounded-md px-2 py-1`)}
        type="number"
        placeholder="Такса"
        name="fee"
      />
      <textarea
        defaultValue={client.facts ?? ""}
        rows={10}
        className={twMerge(`border rounded-md px-2 py-1`)}
        placeholder="Факти"
        name="facts"
      />
      <button className="text-white bg-emerald-600 rounded-md px-2 py-1">
        Добави
      </button>
    </form>
  );
};
