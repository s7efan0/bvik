'use client'


import { useRouter } from "next/navigation"
import { BsArrowLeftShort } from "react-icons/bs"
import ProfileQuestions from "./ProfileQuestions"

const style = {
    wrapper: `border-[#38444d] border-b`,
    header: `py-1 px-3 mt-2 flex items-center`,
    primary: `bg-transperent outline-none font-bold`,
    secondary: `text-[#8899a6] text-xs`,
    backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#f1f2f3] p-1`,
    coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
    coverPhoto: `objcet-cover h-full w-full`,
    profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
    profileImage: `object-cover h-full`,
    profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
    details: `px-3`,
    nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
    activeNav: `text-white`,
}



function ProfileHeader() {
    const router = useRouter()

    const currentAccount = '0xE968bBE116d431C2a2DeBa477a4101B83588AEfc'

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div
                    onClick={() => router.push('/')}
                    className={style.backButton}
                >
                    <BsArrowLeftShort />
                </div>
                <div className={style.details}>
                    <div className={style.primary}>Testing 123</div>
                    <div className={style.secondary}>123 Posts</div>
                </div>
            </div>
            <div className={style.coverPhotoContainer}>
                <img
                    src="https://www.e-lfh.org.uk/wp-content/uploads/2017/02/homepage-test-banner-5.png"
                    alt="cover"
                    className={style.coverPhoto}
                />
            </div>
            <div className={style.profileImageContainer}>
                <div className={style.profileImageContainer}>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                        alt="profielImage"
                        className={style.profileImage}
                    />
                </div>
            </div>

            <div className={style.details}>
                <div>
                    <div className={style.primary}>Test Deatil</div>
                </div>
                <div className={style.secondary}>
                    {currentAccount}
                </div>
            </div>
            <div className={style.nav}>
                <div className={style.activeNav}>Posts</div>
                <div>Questions and Answers</div>
                <div>Media</div>
            </div>
            <ProfileQuestions />
        </div>
    )
}

export default ProfileHeader