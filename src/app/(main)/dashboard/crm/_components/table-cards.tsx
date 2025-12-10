"use client";

import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";

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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { registeredUsersColumns } from "./columns.users";
import { getProfiles } from "../api/getProfiles";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

export function TableCards() {
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    full_name: "",
    phone_no: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getProfiles();
      setUsers(data || []);
    } catch (err) {
      console.error("Supabase fetch error:", err);
    }
  };

  const table = useDataTableInstance({
    data: users,
    columns: registeredUsersColumns,
    getRowId: (row) => row.id?.toString() ?? "",
  });

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.full_name || !newUser.phone_no || !newUser.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) alert(data.error || "Something went wrong");
      else {
        alert("User added successfully!");
        setOpen(false);
        setNewUser({ username: "", email: "", full_name: "", phone_no: "", password: "" });
        fetchUsers(); // refresh table
      }
    } catch (err) {
      console.error(err);
      alert("Error creating user");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>Manage all registered users here.</CardDescription>

        <CardAction>
          <div className="flex items-center gap-2">
            {/* Add New User Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                  <div className="grid gap-1">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={newUser.full_name}
                      onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="phone_no">Phone Number</Label>
                    <Input
                      id="phone_no"
                      value={newUser.phone_no}
                      onChange={(e) => setNewUser({ ...newUser, phone_no: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>

                  <Button onClick={handleAddUser} className="mt-2 w-full">
                    Add User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Table View Options */}
            <DataTableViewOptions table={table} />

            {/* Export Button */}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
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
