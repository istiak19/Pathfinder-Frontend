/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getAllUser = async (queryString?: string) => {
    try {
        const response = await serverFetch.get(`/users${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        });

        const result = await response.json();

        return result;

    } catch (error: any) {
        console.log(error);
    }
};

export async function getUserById(id: string) {
    try {
        const response = await serverFetch.get(`/users/${id}`)
        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}