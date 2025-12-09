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
import { updateUserRole, updateUserStatus } from "@/services/user/user.service";
import { UserInfo, UserRole } from "@/types/user.interface";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

interface IUserManageDialogProps {
    open: boolean;
    mode: "status" | "role";
    onClose: () => void;
    onSuccess: () => void;
    user?: UserInfo;
}

export const UserManageDialog = ({
    open,
    mode,
    onClose,
    onSuccess,
    user,
}: IUserManageDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [pending, setPending] = useState(false);

    const [status, setStatus] = useState("Active");
    const [role, setRole] = useState<UserRole>("TOURIST");

    useEffect(() => {
        if (user) {
            setStatus(user.status || "Active");
            setRole((user.role as UserRole) || "TOURIST");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setPending(true);

        try {
            let res;

            if (mode === "status") {
                res = await updateUserStatus(user.id!, status);
            } else {
                res = await updateUserRole(user.id!, role);
            }

            if (res?.success) {
                toast.success(res.message || "Updated successfully");
                onSuccess();
                onClose();
            } else {
                toast.error(res.message || "Update failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
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
                    <DialogTitle>
                        {mode === "status" ? "Change User Status" : "Change User Role"}
                    </DialogTitle>
                </DialogHeader>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

                        {mode === "status" && (
                            <Field>
                                <FieldLabel>Status</FieldLabel>
                                <Select value={status} onValueChange={setStatus} disabled={pending}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}

                        {mode === "role" && (
                            <Field>
                                <FieldLabel>Role</FieldLabel>
                                <Select
                                    value={role}
                                    onValueChange={(value) => setRole(value as UserRole)}
                                    disabled={pending}
                                >
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
                        )}

                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50 dark:bg-black">
                        <Button
                            type="button"
                            className="cursor-pointer"
                            variant="outline"
                            onClick={handleClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={pending}
                        >
                            {pending ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    );
};