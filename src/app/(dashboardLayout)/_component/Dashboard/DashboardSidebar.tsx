import { getNavItemsByRole } from "@/lib/navItems.config";
import { getMeUser } from "@/services/user/getMeUser";
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute } from "@/utility/helper";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
    const userInfo = (await getMeUser());

    const navItems: NavSection[] = getNavItemsByRole(userInfo?.data?.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo?.data?.role);

    return (
        <DashboardSidebarContent
            userInfo={userInfo.data}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardSidebar;