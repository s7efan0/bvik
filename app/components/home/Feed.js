import { BsStars } from 'react-icons/bs'
import QuestionBox from './QuestionBox'
import QuestionPost from '../QuestionPost'

const style = {
    wrapper: `flex-auto border-r border-l border-[#3844d] overflow-y-auto`,
    header: `sticky top-0 bg-[#ffffff] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
}

// const questions = [
//     {
//         displayName: 'Test Question',
//         userName: '0xBCFcA5D70A3502fF6D2974e0C5E1b1cD7a6b79f4',
//         avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
//         text: 'gm',
//         isProfileImageNft: false,
//         timestamp: '2020-06-01T12:00:00.000Z'
//     }, {
//         displayName: 'Test Question',
//         userName: '0xBCFcA5D70A3502fF6D2974e0C5E1b1cD7a6b79f4',
//         avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
//         text: 'gm',
//         isProfileImageNft: false,
//         timestamp: '2020-06-01T12:00:00.000Z'
//     }, {
//         displayName: 'Test Question',
//         userName: '0xBCFcA5D70A3502fF6D2974e0C5E1b1cD7a6b79f4',
//         avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
//         text: 'gm',
//         isProfileImageNft: false,
//         timestamp: '2020-06-01T12:00:00.000Z'
//     }
// ]

function Feed({
    contractManagerOwner,
    contractNumberOfComments,
    contactBalance,
    questionsArray,
}) {
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.headerTitle}>Home</div>
                <BsStars />
            </div>
            <QuestionBox />
            <div className={`overflow-y-auto`}>
                {
                    questionsArray.map((q, i) =>
                        <QuestionPost
                            key={i}
                            questionsAddress={q}

                        />
                    )
                }
            </div>
        </div>
    )
}

export default Feed