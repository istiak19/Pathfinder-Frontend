"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const UsersFilter = () => {
    return (
        <div className="space-y-3">
            {/* Row 1: Search and Refresh */}
            <div className="flex items-center gap-3">
                <SearchFilter paramName="searchTerm" placeholder="Search names..." />
                <RefreshButton />
            </div>

            {/* Row 2: Filter Controls */}
            <div className="flex items-center gap-3">
                {/* Email Filter */}

                <SearchFilter paramName="email" placeholder="Enter email…" />

                {/* Contact Number Filter */}

                <SearchFilter paramName="status" placeholder="Filter by status (Active / Inactive)" />

                {/* Clear All Filters */}
                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default UsersFilter;