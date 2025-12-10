"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export const registeredUsersColumns: ColumnDef<any>[] = [
  // SELECT CHECKBOX (centered)
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // USERNAME
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[140px] truncate whitespace-nowrap">
        {row.original.username}
      </span>
    ),
    enableSorting: true,
  },

  // FULL NAME
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[160px] truncate whitespace-nowrap hidden sm:block">
        {row.original.full_name}
      </span>
    ),
  },

  // EMAIL
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate whitespace-nowrap hidden lg:block text-muted-foreground">
        {row.original.email}
      </span>
    ),
  },

  // PHONE NO (badge-style like CRM)
  {
    accessorKey: "phone_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="hidden md:inline-block">
        {row.original.phone_no}
      </Badge>
    ),
  },

  // STATUS (optional)
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.status || "Active"}
      </Badge>
    ),
  },

  // ACTIONS (your File-1 style Pencil + Trash buttons)
  {
    id: "actions",
    cell: ({ row }) => {
      const userId = row.original.id;

      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const res = await fetch("/api/delete-user", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId }),
        });

        const data = await res.json();

        if (!res.ok) alert(data.error || "Something went wrong");
        else alert("User deleted successfully!");
      };

      return (
        <div className="flex gap-2 items-center justify-center">
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
  },
];
