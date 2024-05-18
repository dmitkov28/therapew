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
import { useState } from "react";
import SessionForm from "./SessionForm";
import { addSession } from "@/lib/data";
import { useRouter } from "@tanstack/react-router";
export default function SessionDialog({
  clientId,
  open,
  setOpen,
}: {
  clientId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [sessionInput, setSessionInput] = useState({
    date: new Date(),
    notes: "",
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        onClick={() => setOpen(true)}
        className="text-white font-bold bg-emerald-600 rounded-md px-2 py-1 text-center"
      >
        Нова сесия
      </AlertDialogTrigger>
      <AlertDialogContent className="md:min-w-[700px] w-11/12">
        <AlertDialogHeader>
          <AlertDialogTitle>Нова сесия</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <SessionForm
              sessionInput={sessionInput}
              setSessionInput={setSessionInput}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Отмени
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await addSession({
                date: sessionInput.date.toISOString(),
                notes: sessionInput.notes,
                client_id: clientId,
              });
              router.invalidate()
            }}
            className="text-white hover:bg-emerald-600 bg-emerald-600 "
          >
            Добави сесия
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
