"use client";

import * as React from "react";
import {
  Search,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  status: "active" | "suspended";
  storageUsed: string;
  contentCount: number;
  totalEarnings: string;
  joinedDate: string;
}

const INITIAL_USERS: AdminUser[] = [
  { id: "u-1", username: "wizzling", email: "sohan@playxim.com", status: "active", storageUsed: "4.28 TB", contentCount: 38, totalEarnings: "$3,420.50", joinedDate: "Sep 2026" },
  { id: "u-2", username: "cinematic_vfx", email: "alex@vfxstudios.io", status: "active", storageUsed: "8.12 TB", contentCount: 64, totalEarnings: "$5,190.20", joinedDate: "Sep 2026" },
  { id: "u-3", username: "soundscapes", email: "sound@design.fm", status: "active", storageUsed: "1.45 TB", contentCount: 19, totalEarnings: "$840.00", joinedDate: "Oct 2026" },
  { id: "u-4", username: "tokyo_drifter", email: "kenji@tokyo.jp", status: "suspended", storageUsed: "540 GB", contentCount: 6, totalEarnings: "$120.00", joinedDate: "Oct 2026" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<AdminUser[]>(INITIAL_USERS);
  const [search, setSearch] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<AdminUser | null>(null);
  const [impersonateOpen, setImpersonateOpen] = React.useState(false);

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u
      )
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Creator & User Administration"
        description="Inspect account health, storage limits, financial ledger status, and manage access."
      />

      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
          className="max-w-md"
        />
        <Badge variant="secondary" className="font-mono text-xs">
          {filtered.length} Creators Listed
        </Badge>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-brand-border bg-brand-bg-soft/40 text-brand-muted font-semibold">
              <th className="p-4">User</th>
              <th className="p-4">Status</th>
              <th className="p-4">Storage Ingested</th>
              <th className="p-4">Hosted Assets</th>
              <th className="p-4">Total Accrued</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/40 font-mono">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-brand-bg-soft/20 transition-colors">
                <td className="p-4 font-sans font-semibold text-brand-text">
                  <div className="flex flex-col">
                    <span>@{u.username}</span>
                    <span className="text-[11px] font-mono text-brand-muted font-normal">{u.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={u.status === "active" ? "success" : "glow"}>
                    {u.status}
                  </Badge>
                </td>
                <td className="p-4 text-brand-muted">{u.storageUsed}</td>
                <td className="p-4 text-brand-muted">{u.contentCount} items</td>
                <td className="p-4 font-bold text-brand-text">{u.totalEarnings}</td>
                <td className="p-4 text-brand-muted">{u.joinedDate}</td>
                <td className="p-4 text-right font-sans">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(u);
                        setImpersonateOpen(true);
                      }}
                      className="text-xs"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      <span>Impersonate</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(u.id)}
                      className={`text-xs ${
                        u.status === "active"
                          ? "text-amber-600 hover:text-amber-700"
                          : "text-emerald-600 hover:text-emerald-700"
                      }`}
                    >
                      {u.status === "active" ? "Suspend" : "Activate"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Impersonation Confirmation Dialog (§ 6.3 & 6.9) */}
      <Dialog open={impersonateOpen} onOpenChange={setImpersonateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Impersonate Creator Session</DialogTitle>
            <DialogDescription>
              You are about to launch a read-only creator session as @{selectedUser?.username}. All administrative actions are recorded in <code>admin_audit_logs</code>.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 space-y-2 text-xs text-brand-muted">
            <div className="flex justify-between p-2 rounded bg-brand-bg-soft font-mono">
              <span>Account ID:</span>
              <span>{selectedUser?.id}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-brand-bg-soft font-mono">
              <span>Ingested Storage:</span>
              <span>{selectedUser?.storageUsed}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setImpersonateOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert(`Impersonation active for @${selectedUser?.username}. Redirecting to dashboard.`);
                setImpersonateOpen(false);
              }}
            >
              Start Impersonation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
