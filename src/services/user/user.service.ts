/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
        const response = await serverFetch.patch(`/users/status/${userId}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to update status");
        }
        revalidateTag("user-info", { expire: 0 });
        return result;
    } catch (error: any) {
        console.error("Failed to update status:", error.message || error);
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export const updateUserRole = async (userId: string, newRole: string) => {
    try {
        const response = await serverFetch.patch(`/users/role/${userId}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to update role");
        }

        // Revalidate user info cache/tag if needed
        revalidateTag("user-info", { expire: 0 });

        return result;
    } catch (error: any) {
        console.error("Failed to update role:", error.message || error);
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};