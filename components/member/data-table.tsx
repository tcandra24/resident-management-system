"use client";

import { useCallback, useEffect, useState } from "react";
import { CellContext, ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;

    deleteData: (id: string) => void;
  }
}

/* =========================
   TYPE
========================= */

export type Member = {
  id: string;
  name: string;
  birth_date: string;
  job: string | null;
  family_id: string;
};

/* =========================
   EDITABLE CELLS
========================= */

const EditableInputCell = ({ getValue, row, column, table }: CellContext<Member, any>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value ?? ""}
      onChange={(e) => {
        setValue(e.target.value);
        row.toggleSelected(true);
      }}
      onBlur={() => table.options.meta?.updateData(row.index, column.id, value)}
      className="border-0 shadow-none"
    />
  );
};

const EditableDateCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value ?? ""}
      type="date"
      onChange={(e) => {
        setValue(e.target.value);
        row.toggleSelected(true);
      }}
      onBlur={() => table.options.meta?.updateData(row.index, column.id, value)}
      className="border-0 shadow-none"
    />
  );
};

/* =========================
   COLUMNS
========================= */

export const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <ArrowUpDown />
      </Button>
    ),
    cell: EditableInputCell,
  },
  {
    accessorKey: "birth_date",
    header: "Birth Date",
    cell: EditableDateCell,
  },
  {
    accessorKey: "job",
    header: "Job",
    cell: EditableInputCell,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => table.options.meta?.deleteData(row.original.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/* =========================
   DATATABLE
========================= */

export const DataTable = () => {
  const [data, setData] = useState<Member[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const params = useParams();

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    setData((old) => old.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row)));
  };

  const deleteData = async (id: string) => {
    const response = await fetch(`/api/member/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    setData((old) => old.filter((element) => element.id !== data.data.id));
  };

  const table = useReactTable({
    data,
    columns,
    meta: {
      updateData,
      deleteData,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const addRow = () => {
    setData((prev) => [
      ...prev,
      {
        id: `new-${Math.random().toString(36).slice(2, 9)}`,
        name: "",
        birth_date: new Date().toISOString().slice(0, 10),
        job: "",
        family_id: params?.family_id as string,
      },
    ]);
  };

  const saveChanges = async () => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);

    const response = await fetch(`/api/member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedRows),
    });

    const data = await response.json();
    if (!data.success) {
      console.log("Error : " + data.message);
      return;
    }

    table.resetRowSelection();
  };

  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/house/${params?.id}/family/${params?.family_id}`);
    const data = await response.json();

    if (!data.success) {
      console.log("Error : " + data.message);
      return;
    }

    setData(data.data);
  }, [params?.id, params?.family_id]);

  useEffect(() => {
    if (!params?.id || !params?.family_id) return;
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-3">
        <Input placeholder="Filter Name..." value={(table.getColumn("name")?.getFilterValue() as string) ?? ""} onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)} className="max-w-sm" />

        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        <Button onClick={addRow}>
          <IconPlus /> Add Row
        </Button>

        <Button onClick={saveChanges} variant="default">
          Save Changes
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end py-4 gap-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
};
