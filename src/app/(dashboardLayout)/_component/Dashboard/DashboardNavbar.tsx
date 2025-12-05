import { getNavItemsByRole } from "@/lib/navItems.config";
import { getMeUser } from "@/services/user/getMeUser";
// import { UserInfo } from "@/types/user.interface";
import { getDefaultDashboardRoute } from "@/utility/helper";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
    const userInfo = (await getMeUser());
    const navItems = getNavItemsByRole(userInfo?.data?.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo?.data?.role);

    return (
        <DashboardNavbarContent
            userInfo={userInfo?.data}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardNavbar;