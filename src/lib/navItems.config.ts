import { NavSection } from "@/types/dashboard.interface";
import { UserRole } from "@/types/user.interface";
import { getDefaultDashboardRoute } from "@/utility/helper";


export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },

            ]
        },
        // {
        //     title: "Settings",
        //     items: [
        //         {
        //             title: "Change Password",
        //             href: "/change-password",
        //             icon: "Settings",
        //             roles: ["TOURIST"],
        //         },
        //     ],
        // },
    ]
}

export const guideNavItems: NavSection[] = [
    {
        title: "Listings Management",
        items: [
            {
                title: "All listings",
                href: "/guide/dashboard/listings",
                icon: "Calendar",
                roles: ["GUIDE"],
            },
            {
                title: "Add listing",
                href: "/guide/dashboard/listing/create",
                icon: "Clock",
                roles: ["GUIDE"],
            },
            {
                title: "Bookings from travelers",
                href: "/guide/dashboard/bookings",
                icon: "FileText",
                roles: ["GUIDE"],
            },
        ],
    }
]

export const touristNavItems: NavSection[] = [
    {
        title: "Trips",
        items: [
            {
                title: "My Bookings",
                href: "/tourist/dashboard/trips",
                icon: "Calendar",
                roles: ["TOURIST"],
            },
            {
                title: "Wishlist",
                href: "/tourist/dashboard/wishlist",
                icon: "ClipboardList",
                roles: ["TOURIST"],
            },
        ],
    },
    // {
    //     title: "Medical Records",
    //     items: [
    //         {
    //             title: "My Prescriptions",
    //             href: "/dashboard/my-prescriptions",
    //             icon: "FileText",
    //             roles: ["TOURIST"],
    //         },
    //         {
    //             title: "Health Records",
    //             href: "/dashboard/health-records",
    //             icon: "Activity",
    //             roles: ["TOURIST"],
    //         },
    //     ],
    // },

]

export const adminNavItems: NavSection[] = [
    {
        title: "Users Management",
        items: [
            {
                title: "Manage users",
                href: "/admin/dashboard/users",
                icon: "Shield",
                roles: ["ADMIN"],
            },
            {
                title: "Manage users",
                href: "/admin/dashboard/listings",
                icon: "Stethoscope",
                roles: ["ADMIN"],
            },
            {
                title: "Manage all bookings",
                href: "/admin/dashboard/bookings",
                icon: "Users",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Hospital Management",
        items: [
            {
                title: "Appointments",
                href: "/admin/dashboard/appointments-management",
                icon: "Calendar",
                roles: ["ADMIN"],
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock",
                roles: ["ADMIN"],
            },
            {
                title: "Specialties",
                href: "/admin/dashboard/specialties-management",
                icon: "Hospital",
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...guideNavItems];
        case "TOURIST":
            return [...commonNavItems, ...touristNavItems];
        default:
            return [];
    }
};