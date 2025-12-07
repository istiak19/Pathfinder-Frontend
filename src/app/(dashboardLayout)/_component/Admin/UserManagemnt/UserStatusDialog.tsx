"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUserStatus } from "@/services/user/user.service";
import { UserInfo } from "@/types/user.interface";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface IUserStatusDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    user?: UserInfo;
}

const UserStatusDialog = ({ open, onClose, onSuccess, user }: IUserStatusDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        updateUserStatus.bind(null, user?.id as string),
        null
    );

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || "Status updated successfully");
            onSuccess();
            onClose();
        } else if (state?.message && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose]);

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Change User Status</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        <Field>
                            <FieldLabel htmlFor="status">Status</FieldLabel>
                            <Select name="status" defaultValue={user?.status || "Active"} disabled={isPending}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50 dark:bg-black">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Status"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserStatusDialog;