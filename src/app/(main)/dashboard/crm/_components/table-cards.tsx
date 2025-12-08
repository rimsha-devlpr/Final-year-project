/*"use client";

import { Download } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { recentLeadsColumns } from "./columns.crm";
import { recentLeadsData } from "./crm.config";

export function TableCards() {
  const table = useDataTableInstance({
    data: recentLeadsData,
    columns: recentLeadsColumns,
    getRowId: (row) => row.id.toString(),
  });

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Track and manage your latest leads and their status.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <DataTableViewOptions table={table} />
              <Button variant="outline" size="sm">
                <Download />
                <span className="hidden lg:inline">Export</span>
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          <div className="overflow-hidden rounded-md border">
            <DataTable table={table} columns={recentLeadsColumns} />
          </div>
          <DataTablePagination table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
*/
"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";

import { registeredUsersColumns } from "./columns.users";
import { getProfiles } from "../api/getProfiles";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

export function TableCards() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getProfiles()
      .then((data) => setUsers(data || []))
      .catch((err) => console.error("Supabase fetch error:", err));
  }, []);

  const table = useDataTableInstance({
    data: users,
    columns: registeredUsersColumns,
    getRowId: (row) => row.id?.toString() ?? "",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>Manage all registered users here.</CardDescription>

        <CardAction>
          <div className="flex items-center gap-2">
            <DataTableViewOptions table={table} />
            <Button variant="outline" size="sm">
              <Download />
              <span className="hidden lg:inline">Export</span>
            </Button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-md border">
          <DataTable table={table} columns={registeredUsersColumns} />
        </div>

        <DataTablePagination table={table} />
      </CardContent>
    </Card>
  );
}
