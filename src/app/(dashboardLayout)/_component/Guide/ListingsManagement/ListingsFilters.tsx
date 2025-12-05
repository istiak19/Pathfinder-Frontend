/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
// import SelectFilter from "@/components/shared/SelectFilter";

export const listings = [
    { label: "Food", value: "FOOD" },
    { label: "Art", value: "ART" },
    { label: "Adventure", value: "ADVENTURE" },
    { label: "Nature", value: "NATURE" },
    { label: "Culture", value: "CULTURE" },
    { label: "Shopping", value: "SHOPPING" },
    { label: "Sports", value: "SPORTS" },
    { label: "Wellness", value: "WELLNESS" },
    { label: "History", value: "HISTORY" },
    { label: "Entertainment", value: "ENTERTAINMENT" }
];


const ListingsFilters = ({ listings }: any) => {
    return (
        <div className="space-y-3">
            {/* Row 1: Search and Refresh */}
            <div className="flex items-center gap-3">
                <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
                <RefreshButton />
            </div>

            {/* Row 2: Filter Controls - All on same line */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Specialties Multi-Select */}
                <MultiSelectFilter
                    paramName="listings"
                    options={listings.map((listing: any) => ({
                        value: listing.title,
                        label: listing.title,
                    }))}
                    placeholder="Select specialties"
                    searchPlaceholder="Search specialties..."
                    emptyMessage="No specialty found."
                    showBadges={false}
                />

                {/* Gender Filter */}
                {/* <SelectFilter
                    paramName="gender"
                    placeholder="Gender"
                    defaultValue="All Genders"
                    options={[
                        { label: "Male", value: "MALE" },
                        { label: "Female", value: "FEMALE" },
                    ]}
                /> */}

                {/* Email Filter */}
                <SearchFilter paramName="email" placeholder="Email" />

                {/* Contact Number Filter */}
                <SearchFilter paramName="contactNumber" placeholder="Contact" />

                {/* Clear All Filters */}
                <ClearFiltersButton />
            </div>

            {/* Row 3: Active Filter Badges - Fixed height to prevent shift */}
            <MultiSelectFilter
                paramName="listings"
                options={listings.map((listing: any) => ({
                    value: listing.title,
                    label: listing.title,
                }))}
                placeholder=""
                badgesOnly={true}
            />
        </div>
    );
};

export default ListingsFilters;