import { getMeUser } from "@/services/user/getMeUser";
// import MyProfile from "../../_component/MyProfile/MyProfile";

const MyProfilePage = async () => {
    const userInfo = await getMeUser();
    console.log(userInfo)
    // return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;