import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteClient } from "@/lib/data";
import { useNavigate } from "@tanstack/react-router";
export default function Dialog({ client }: { client: ClientRead }) {
  const navigate = useNavigate();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full md:w-fit text-white font-bold bg-red-500 rounded-md px-2 py-1 text-center">
        Изтриване
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Изтриване на клиент</AlertDialogTitle>
          <AlertDialogDescription>
            Изтриване нa {client.name}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмени</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteClient(client.id);
              navigate({ to: "/" });
            }}
            className="text-white bg-red-500 hover:bg-red-500"
          >
            Потвърди
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
