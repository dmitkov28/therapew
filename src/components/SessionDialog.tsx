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
import { addSession } from "@/lib/data";
import { useRouter } from "@tanstack/react-router";
import { MicIcon } from "lucide-react";
import { useState } from "react";
import SessionForm from "./SessionForm";
import { Button } from "./ui/button";

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

  const [recordingMode, setRecordingMode] = useState(false);

  return (
    <AlertDialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setSessionInput((prevData) => ({ ...prevData, notes: "" }));
      }}
    >
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
              recordingMode={recordingMode}
              setRecordingMode={setRecordingMode}
              sessionInput={sessionInput}
              setSessionInput={setSessionInput}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-center">
          <Button
            onClick={() => setRecordingMode((prev) => !prev)}
            className="mr-auto text-emerald-600 border border-emerald-600 px-2 py-1 rounded-md font-medium inline-flex justify-center items-center gap-2 hover:bg-transparent bg-transparent md:w-fit w-full md:my-0 my-2"
          >
            {recordingMode ? (
              "Текст"
            ) : (
              <>
                <MicIcon size={20} />
                Звукозапис
              </>
            )}
          </Button>

          <AlertDialogCancel className="w-full md:w-fit" onClick={() => setOpen(false)}>
            Отмени
          </AlertDialogCancel>
          {!recordingMode && (
            <AlertDialogAction

              onClick={async () => {
                await addSession({
                  date: sessionInput.date.toISOString(),
                  notes: sessionInput.notes,
                  client_id: clientId,
                });
                router.invalidate();
              }}
              className="text-white hover:bg-emerald-600 bg-emerald-600 w-full md:w-fit"
            >
              Добави сесия
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
