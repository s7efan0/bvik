import QuestionPost from "../QuestionPost"

const style = {
    wrapper: `no-scrollbar`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
}

const questions = [
    {
        displayName: 'Test Question',
        userName: '0xBCFcA5D70A3502fF6D2974e0C5E1b1cD7a6b79f4',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z'
    }, {
        displayName: 'Test Question',
        userName: '0xBCFcA5D70A3502fF6D2974e0C5E1b1cD7a6b79f4',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z'
    }, {
        displayName: 'Test Question',
        userName: '0xBCFcA5D70A3502fF6D2974e0C5E1b1cD7a6b79f4',
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z'
    }
]

function ProfileQuestions() {
    return (
        <div className={style.wrapper}>
            {questions.map((question, index) => (
                <QuestionPost
                    key={index}
                    displayName="Test"
                    userName={`${question.userName.slice(0, 4)}...${question.userName.slice(-4, -1)}`}
                    avater={question.avatar}
                    text={question.text}
                    isProfileImageNft={false}
                    timestamp={question.timestamp}
                />
            ))}
        </div>
    )
}

export default ProfileQuestions