'use client'

import { useState } from "react"
import { BsCardImage, BsEmojiSmile } from "react-icons/bs"
import { RiBarChartHorizontalFill, RiFileGifLine } from "react-icons/ri"
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { StackQuestionAbi, StackQuestionsManagerAbi, contractAddress } from "@/app/lib/constants";

const ethers = require("ethers")

const style = {
    wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
    boxLeft: `mr-4`,
    boxRight: `flex-1`,
    profileImage: `size-14 rounded-md`,
    inputField: `mt-2 w-full h-full ml-3 outline-none bg-transparent text-lg resize-none`,
    fromLowerContainer: `flex`,
    iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
    icon: `mt-2 mr-2 size-6 inset-0`,
    submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
    inactiveSubmit: `bg-[#196195] text-[#95999e]`,
    activeSubmit: `bg-[#1d9bf0] text-white`,
    numberInput: `h-full rounded-3xl outline-none px-6 py-2 font-bold bg-transparent border-0 text-gray-800 focus:ring-0`
}

function checkAmount(amount) {
    if (amount && amount > 0) {
        return amount
    }
    return 0
}

function QuestionBox() {
    const [questionText, setQuestionText] = useState('')
    const [questionTitle, setQuestionTitle] = useState('')
    const [bountyAmount, setBountyAmount] = useState('')

    const postQuestion = async (event) => {
        event.preventDefault()
        console.log(questionText)
        console.log(questionTitle)
        console.log(bountyAmount)

        try {
            const amountChecked = checkAmount(bountyAmount)


            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await web3Provider.getSigner()

            const contractManager = new ethers.Contract(contractAddress, StackQuestionsManagerAbi, signer);

            const options = { value: ethers.parseUnits(String(amountChecked), "wei") }

            contractManager.connect(signer)
            const reciept = await contractManager.addQuestion(questionTitle, questionText, options)


            setQuestionText('')
            setQuestionTitle('')
            setBountyAmount('')
        } catch (err) {

            console.log({ err });
        }

    }

    return (
        <div className={style.wrapper}>
            <div className={style.boxLeft}></div>
            {/* <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="profile image"
                className={style.profileImage}
            /> */}
            <div className={style.boxRight}>
                <form>
                    <input
                        className={style.inputField}
                        type="text"
                        placeholder="Question Title"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                    />

                    <textarea
                        className={style.inputField}
                        placeholder="Question body"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />

                    <div className={style.fromLowerContainer}>
                        {/* <div className={style.iconsContainer}>
                            <BsCardImage className={style.icon} />
                            <RiFileGifLine className={style.icon} />
                            <RiBarChartHorizontalFill className={style.icon} />
                            <BsEmojiSmile className={style.icon} />
                            <IoMdCalendar className={style.icon} />
                            <MdOutlineLocationOn className={style.icon} />
                        </div> */}

                        <FaEthereum className={style.icon} />
                        <input
                            className={style.numberInput}
                            type="text"
                            placeholder="Bounty Amount"
                            value={bountyAmount}
                            onChange={(e) => setBountyAmount(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={!(questionText && questionTitle && bountyAmount)}
                            onClick={(event) => postQuestion(event)}
                            className={`${style.submitGeneral} ${(questionText && questionTitle && bountyAmount) ? style.activeSubmit : style.inactiveSubmit}`}

                        >
                            Ask Question
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default QuestionBox