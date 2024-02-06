import Sidebar from "../components/Sidebar"
import ProfileHeader from "../components/profile/ProfileHeader"
import ProfileQuestions from "../components/profile/ProfileQuestions"

const style = {
    wrapper: `flex justify-center h-screen w-screen select-none bg-[#ffffff] font-semibold text-black`,
    content: `max-w-[1400px] w-2/3 flex justify-between`,
    mainContent: `flex-[2] border-r border-l border-[#38444d]`
}

function profile() {
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <Sidebar />
                <ProfileHeader />
                {/* <ProfileQuestions /> */}
            </div>
        </div>
    )
}

export default profile