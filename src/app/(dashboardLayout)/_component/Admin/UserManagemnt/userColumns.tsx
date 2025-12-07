"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ReusableManagementTable";
import { UserInfo } from "@/types/user.interface";

export const usersColumns: Column<UserInfo>[] = [
    {
        header: "User",
        accessor: (user) => (
            <UserInfoCell
                name={user.name}
                email={user.email}
                photo={user.profilePic}
            />
        ),
        sortKey: "name",
    },
    {
        header: "Status",
        accessor: (user) => <StatusBadgeCell isDeleted={user.status !== "Active"} />,
    },
    {
        header: "Role",
        accessor: (user) => <span className="text-sm capitalize">{user.role}</span>,
    },
    {
        header: "Languages",
        accessor: (user) => (
            <span className="text-sm">{user.languages?.join(", ") || "N/A"}</span>
        ),
    },
    {
        header: "Joined",
        accessor: (user) => <DateCell date={user.createdAt} />,
        sortKey: "createdAt",
    },
];