export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { getMeUser } from "@/services/user/getMeUser";
import MyProfile from "../../_component/MyProfile/MyProfile";

const MyProfilePage = async () => {
    const userInfo = await getMeUser();
    return <MyProfile userInfo={userInfo?.data} />;
};

export default MyProfilePage;