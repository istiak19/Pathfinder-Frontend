export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { getMeUser } from "@/services/user/getMeUser";
import MyProfile from "../../_component/MyProfile/MyProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Profile – Pathfinder",
    description:
        "View and manage your guide profile on Pathfinder. Update your personal information, tour offerings, availability, and showcase your expertise to travelers.",
    keywords: [
        "Pathfinder",
        "guide profile",
        "local guide dashboard",
        "profile management",
        "tour guide information",
        "update guide profile",
        "travel experiences",
        "tour offerings",
    ],
};


const MyProfilePage = async () => {
    const userInfo = await getMeUser();
    return <MyProfile userInfo={userInfo?.data} />;
};

export default MyProfilePage;