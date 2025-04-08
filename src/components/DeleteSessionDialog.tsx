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
import { deleteSession } from "@/lib/data";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { TrashIcon } from "lucide-react";

export default function DeleteSessionDialog({
  sessionId,
  clientId,
}: {
  sessionId: string;
  clientId: string;
}) {
  const navigate = useNavigate();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full md:w-fit text-white font-bold bg-red-500 rounded-md px-1 py-0.5 text-center">
        <TrashIcon width={15} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Изтриване на сесия</AlertDialogTitle>
          <AlertDialogDescription>Изтриване нa сесия?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмени</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteSession(sessionId);

              await router.invalidate();

              navigate({ to: "/clients/$clientId", params: { clientId } });
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
