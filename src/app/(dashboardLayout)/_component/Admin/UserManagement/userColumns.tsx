"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ReusableManagementTable";
import { UserInfo } from "@/types/user.interface";

export const usersColumns = (handleEditRole: (u: UserInfo) => void): Column<UserInfo>[] => [
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
        accessor: (user) => (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-md capitalize ${user.status === "Active" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}
            >
                {user.status}
            </span>
        ),
    },
    {
        header: "Role",
        accessor: (u) => (
            <div className="flex items-center gap-2">
                <span className="text-sm capitalize">{u.role}</span>
                <button
                    className="px-2 py-1 cursor-pointer rounded bg-blue-500 text-white text-xs"
                    onClick={() => handleEditRole(u)}
                >
                    Change
                </button>
            </div>
        ),
        sortKey: "role",
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