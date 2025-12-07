/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";
import RefreshButton from "@/components/shared/RefreshButton";


const GuideBookingFilter = () => {
    const status = [
        { label: "PENDING", value: "PENDING" },
        { label: "ACCEPTED", value: "ACCEPTED" },
        { label: "REJECTED", value: "REJECTED" },
        { label: "CONFIRMED", value: "CONFIRMED" },
        { label: "COMPLETED", value: "COMPLETED" },
        { label: "CANCELLED", value: "CANCELLED" }
    ];

    return (
        <div className="space-y-3">
            {/* Row 2: Filter Controls - All on same line */}
            <div className="flex items-center gap-2 flex-wrap">
                <RefreshButton />
                {/* Status Multi-Select */}
                <MultiSelectFilter
                    paramName="status"
                    options={status?.map((s: any) => ({
                        value: s.value,
                        label: s.label,
                    }))}
                    placeholder="Select Status"
                    emptyMessage="No status found."
                    showBadges={false}
                />

                {/* Clear All Filters */}
                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default GuideBookingFilter;