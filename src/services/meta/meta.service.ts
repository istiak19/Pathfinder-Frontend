/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getMeta() {
    try {
        const response = await serverFetch.get("/meta");
        const result = await response.json();

        return result
    } catch (error: any) {
        console.error("Get reviews error:", error);
        return {
            success: false,
            message: error.message || "Failed to fetch reviews",
            data: null,
        };
    }
};