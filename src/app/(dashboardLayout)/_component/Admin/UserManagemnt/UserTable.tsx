"use client";

// import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
// import { softDeleteUser } from "@/services/admin/usersManagement"; 
import { UserInfo } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
// import { toast } from "sonner";
import ReusableManagementTable from "@/components/shared/ReusableManagementTable";
import UserViewDetailDialog from "./UserViewDetailDialog";
import { usersColumns } from "./userColumns";
import UserStatusDialog from "./UserStatusDialog";

interface UsersTableProps {
    users: UserInfo[];
}

const UsersTable = ({ users }: UsersTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    // const [deletingUser, setDeletingUser] = useState<UserInfo | null>(null);
    const [viewingUser, setViewingUser] = useState<UserInfo | null>(null);
    const [editingUser, setEditingUser] = useState<UserInfo | null>(null);
    // const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (user: UserInfo) => setViewingUser(user);
    const handleEdit = (user: UserInfo) => setEditingUser(user);
    // const handleDelete = (user: UserInfo) => setDeletingUser(user);

    // const confirmDelete = async () => {
    //     if (!deletingUser) return;

    //     setIsDeleting(true);
    //     const result = await softDeleteUser(deletingUser.id!);
    //     setIsDeleting(false);

    //     if (result.success) {
    //         toast.success(result.message || "User deleted successfully");
    //         setDeletingUser(null);
    //         handleRefresh();
    //     } else {
    //         toast.error(result.message || "Failed to delete user");
    //     }
    // };

    return (
        <>
            <ReusableManagementTable
                data={users}
                columns={usersColumns}
                onView={handleView}
                onEdit={handleEdit}
                // onDelete={handleDelete}
                getRowKey={(user) => user.id!}
                emptyMessage="No users found"
            />

            {/* Edit User Form Dialog */}
            <UserStatusDialog
                open={!!editingUser}
                onClose={() => setEditingUser(null)}
                user={editingUser!}
                onSuccess={() => {
                    setEditingUser(null);
                    handleRefresh();
                }}
            />

            {/* View User Detail Dialog */}
            <UserViewDetailDialog
                open={!!viewingUser}
                onClose={() => setViewingUser(null)}
                user={viewingUser!}
            />

            {/* Delete Confirmation Dialog */}
            {/* <DeleteConfirmationDialog
                open={!!deletingUser}
                onOpenChange={(open) => !open && setDeletingUser(null)}
                onConfirm={confirmDelete}
                title="Delete User"
                description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            /> */}
        </>
    );
};

export default UsersTable;