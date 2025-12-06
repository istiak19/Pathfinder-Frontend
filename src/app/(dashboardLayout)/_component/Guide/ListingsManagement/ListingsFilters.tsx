/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
// import SelectFilter from "@/components/shared/SelectFilter";


// export const listing = [
//     { label: "FOOD", value: "FOOD" },
//     { label: "ARt", value: "ART" },
//     { label: "ADVENTURE", value: "ADVENTURE" },
//     { label: "NATURE", value: "NATURE" },
//     { label: "CULTURE", value: "CULTURE" },
//     { label: "SHOPPING", value: "SHOPPING" },
//     { label: "SPORTS", value: "SPORTS" },
//     { label: "WELLNESS", value: "WELLNESS" },
//     { label: "HISTORY", value: "HISTORY" },
//     { label: "ENTERTAINMENT", value: "ENTERTAINMENT" }
// ];


const ListingsFilters = () => {
    const listings = [
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
    return (
        <div className="space-y-3">
            {/* Row 1: Search and Refresh */}
            <div className="flex items-center gap-3">
                <SearchFilter paramName="searchTerm" placeholder="Search by listing title (e.g. Sylhet Tea Tour)" />
                <RefreshButton />
            </div>

            {/* Row 2: Filter Controls - All on same line */}
            <div className="flex items-center gap-2 flex-wrap">
                {/* Specialties Multi-Select */}
                <MultiSelectFilter
                    paramName="category"
                    options={listings?.map((listing: any) => ({
                        value: listing.value,
                        label: listing.label,
                    }))}
                    placeholder="Select Listings"
                    searchPlaceholder="Search by listing title (e.g. Sylhet Tea Tour)"
                    emptyMessage="No listing found."
                    showBadges={false}
                />

                {/* All Categories */}
                {/* <SelectFilter
                    paramName="category"
                    placeholder="Category"
                    defaultValue="All Categories"
                    options={listing}
                /> */}


                {/* City Filter */}
                <SearchFilter paramName="city" placeholder="Search by city (e.g. Dhaka)" />

                {/* language Filter */}
                <SearchFilter paramName="language" placeholder="Search by language (e.g. Bangla)" />

                {/* Category Filter */}
                <SearchFilter paramName="priceMin" placeholder="Minimum price (e.g. 500)" />

                {/* Clear All Filters */}
                <ClearFiltersButton />
            </div>

            {/* Row 3: Active Filter Badges - Fixed height to prevent shift */}
            <MultiSelectFilter
                paramName="listings"
                options={listings?.map((listing: any) => ({
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