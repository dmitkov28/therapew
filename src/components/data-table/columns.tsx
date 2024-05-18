import { Database } from "@/types/supabase";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<
  Database["public"]["Tables"]["client"]["Row"]
>[] = [
  { accessorKey: "id", header: "id" },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Име
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Възраст
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  { accessorKey: "occupation", header: "Професия" },
  {
    accessorKey: "fee",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Такса
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  { accessorKey: "email", header: "Имейл" },
  { accessorKey: "phone", header: "Телефон" },
];
