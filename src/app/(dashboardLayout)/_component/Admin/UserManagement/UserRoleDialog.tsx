"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateUserRole } from "@/services/user/user.service";
import { UserInfo, UserRole } from "@/types/user.interface";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

interface IUserRoleDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    user?: UserInfo;
}

export const UserRoleDialog = ({ open, onClose, onSuccess, user }: IUserRoleDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [pending, setPending] = useState(false);
    const [role, setRole] = useState<UserRole>("TOURIST");

    useEffect(() => {
        if (user?.role) setRole(user.role as UserRole);
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setPending(true);
        try {
            const res = await updateUserRole(user.id!, role);
            if (res.success) {
                toast.success(res.message || "User role updated");
                onSuccess();
                onClose();
            } else {
                toast.error(res.message || "Failed to update role");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update role");
        } finally {
            setPending(false);
        }
    };

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Change User Role</DialogTitle>
                </DialogHeader>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        <Field>
                            <FieldLabel>Role</FieldLabel>
                            <Select
                                value={role}
                                onValueChange={(value) => setRole(value as UserRole)}
                                disabled={pending}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="TOURIST">Tourist</SelectItem>
                                    <SelectItem value="GUIDE">Guide</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50 dark:bg-black">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={pending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Updating..." : "Update Role"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};