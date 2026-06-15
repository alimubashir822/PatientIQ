import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUsers } from "@/lib/data-access";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, ShieldAlert } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const users = await getUsers();

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-display">User Accounts Console</h2>
          <p className="text-xs text-muted-foreground">
            Manage system logins, registration logs, roles, and administrative flags.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <Card className="shadow-premium">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Registered Members
          </CardTitle>
          <CardDescription className="text-xs">
            Search and manage settings for all registered portal accounts.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 border-t border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>System Role</TableHead>
                <TableHead>Account ID</TableHead>
                <TableHead>Created Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-semibold">{u.name}</TableCell>
                  <TableCell className="text-xs text-slate-650 font-medium">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === "ADMIN" ? "destructive" : u.role === "DOCTOR" ? "info" : "default"}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{u.id}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{formatDate(u.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
