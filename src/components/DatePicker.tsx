"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { bg } from "date-fns/locale/bg";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function DatePicker({
  sessionInput,
  setSessionInput,
}: {
  sessionInput: {
    date: Date;
    notes: string;
  };
  setSessionInput: React.Dispatch<
    React.SetStateAction<{
      date: Date;
      notes: string;
    }>
  >;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !sessionInput.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {sessionInput.date ? (
            format(sessionInput.date, "PPP", { locale: bg })
          ) : (
            <span>Избери дата</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={bg}
          selected={sessionInput.date}
          onSelect={(selected) => {
            setSessionInput((data) => ({ ...data, date: selected as Date }));
            setOpen(false );
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
