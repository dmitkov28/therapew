import Logo from "@/components/Logo";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "@/components/data-table/columns";
import { getPaginatedClients } from "@/lib/data";
import { useDebounced } from "@/lib/hooks";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SortingState } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

export const Route = createFileRoute("/_protected/clients/")({
  component: () => Dashboard(),
});

const Dashboard = () => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  const [searchFilter, setSearchFilter] = useState("");
  const debouncedFilter = useDebounced(searchFilter);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    lastPage: 0,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const from = pagination.pageIndex * pagination.pageSize;
  const to = from + pagination.pageSize - 1;

  const { data, isLoading, refetch, isFetched } = useQuery({
    queryKey: ["data", pagination.pageIndex, debouncedFilter, sorting],
    queryFn: () =>
      getPaginatedClients({
        from,
        to,
        searchFilter: debouncedFilter,
        sortBy: sorting.length ? sorting[0].id as keyof ClientRead : undefined,
        desc: sorting.length ? sorting[0].desc : undefined,
      }),
    enabled: false,
  });

  useEffect(() => {
    if (sorting.length) {
      console.log(sorting);
    }
  }, [sorting]);

  useEffect(() => {
    if (
      pagination.pageIndex >= 0 &&
      pagination.pageIndex <= pagination.lastPage
    ) {
      if (data && data.length < pagination.pageSize) {
        setPagination((prev) => ({ ...prev, lastPage: pagination.pageIndex }));
        return;
      } else {
        setPagination((prev) => ({ ...prev, lastPage: prev.lastPage + 1 }));
      }

      if (!data || !isFetched) {
        refetch();
      }
    }
  }, [pagination.pageIndex, data]);

  return (
    <div className="w-full md:p-12 p-3">
      <div className="flex md:justify-between justify-center items-center mb-4 flex-wrap gap-y-8 md:gap-y-0">
        <Logo />
        <div className="flex w-full md:w-fit flex-col items-end space-y-8">
          <div className="relative w-full">
            <SearchIcon className="h-5 absolute top-1/2 left-1 -translate-y-1/2 text-slate-400" />
            <input
              onChange={handleChange}
              className="rounded-md border pl-8 pr-2 py-1 w-full"
              placeholder="Търсене..."
              type="text"
              name=""
              id=""
            />
          </div>

          <Link
            to="/clients/add"
            className="md:w-fit w-full text-center bg-emerald-600 text-white px-2 py-1 rounded-md"
          >
            Добави клиент
          </Link>
        </div>
      </div>

      <DataTable
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  );
};
