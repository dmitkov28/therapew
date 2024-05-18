// @ts-nocheck
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Spinner from "../Spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: {
    pageIndex: number;
    pageSize: number;
    lastPage: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
      lastPage: number;
    }>
  >;
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  setPagination,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      sorting,
      pagination,
    },
    initialState: { columnVisibility: { id: false } },
  });

  return (
    <div className="rounded-md border flex flex-col justify-between w-full min-h-[645px] mb-8">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="cursor-pointer"
                onClick={() => navigate({ to: row.original.id })}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="h-full">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {!data.length && !isLoading && "Няма данни."}
                {isLoading && <Spinner />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="p-4 w-full flex justify-between items-center gap-4">
        <button
          disabled={pagination.pageIndex === 0}
          className={`${pagination.pageIndex === 0 && "bg-gray-200 text-gray-400 cursor-not-allowed"} text-white text-center px-2 py-1 bg-emerald-600 rounded-md`}
          onClick={() => table.previousPage()}
        >
          &larr; Предишна страница
        </button>
        <button
          disabled={pagination.pageIndex === pagination.lastPage}
          className={`${pagination.pageIndex === pagination.lastPage && "bg-gray-200 text-gray-400 cursor-not-allowed"} text-white text-center px-2 py-1 bg-emerald-600 rounded-md`}
          onClick={() => {
            pagination.pageIndex < pagination.lastPage && table.nextPage();
          }}
        >
          Следваща страница &rarr;
        </button>
      </div>
    </div>
  );
}
