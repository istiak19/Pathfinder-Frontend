/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

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

        return result;
    } catch (error: any) {
        console.error("Failed to update status:", error.message || error);
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};