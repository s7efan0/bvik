"use client";
import { format } from 'timeago.js'
import { FaRegComment, FaRetweet } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { StackQuestionAbi } from '../lib/constants'
import { FaEthereum } from "react-icons/fa";

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaStop } from "react-icons/fa";

import { IoIosSend } from "react-icons/io";

const ethers = require("ethers")

const style = {
    wrapper: `flex p-3 border-b border-[#38444d]`,
    profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
    postMain: `flex-1 px-4`,
    addressBox: `flex items-center`,
    name: `font-bold mr-1`,
    verified: `text-[0.8rem]`,
    address: `text-[#8899a6] m1-1`,
    questionTitleBox: `flex flex-wrap`,
    question: `my-2`,
    questionTitle: `text-xl font-bold`,
    questionBody: `p-3`,
    image: `rounded-3xl`,
    footer: `flex items-center justify-between mr-28 mt-4 text-[#8899a6] text-grey-400`,
    footerIcon: `rounded-full text-lg p-2`,
}

// const fakeAnswers = [
//     {
//         owner: "0xE968bBE116d431C2a2DeBa477a4101B83588AEfc",
//         id: "uint256",
//         bodyText: "stringasdasfasgfasf",
//         isCorrect: false,
//     },
//     {
//         owner: "0xE968bBE116d431C2a2DeBa477a4101B83588AEfc",
//         id: "uint256",
//         bodyText: "string asdasfasgasg",
//         isCorrect: true,
//     },
//     {
//         owner: "0xE968bBE116d431C2a2DeBa477a4101B83588AEfc",
//         id: "uint256",
//         bodyText: "string answeraweraksdfnlansf",
//         isCorrect: false,
//     }
// ]


function QuestionPost({
    questionsAddress,
}) {
    const [selectedAddress, setSelectedAddress] = useState()

    const [allAnswers, setAllAnswers] = useState()
    const [answersCounter, setAnswersCounter] = useState()
    const [contractBalance, setContractBalance] = useState()
    const [bodyText, setBodyText] = useState()
    const [bountyAmount, setBountyAmount] = useState()
    const [contractId, setContractId] = useState()
    const [isAnswered, setIsAnswered] = useState()
    const [isClosed, setIsClosed] = useState()
    const [questionOwner, setQuestionOwner] = useState()
    const [title, setTitle] = useState()

    const [answerText, setAnswerText] = useState()

    async function acceptAnswer(event, answerId) {
        console.log("acceptAnswer")
        console.log(Number(answerId))
        console.log(typeof (answerId))

        try {
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await web3Provider.getSigner()

            const questionContract = new ethers.Contract(questionsAddress, StackQuestionAbi, signer);

            questionContract.connect(signer)
            const reciept = await questionContract.answerAccepted(Number(answerId))
        } catch (err) {

            console.log({ err });
        }
    }

    async function postAnswer(event) {
        event.preventDefault()
        console.log(answerText)

        try {
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await web3Provider.getSigner()

            const questionContract = new ethers.Contract(questionsAddress, StackQuestionAbi, signer);

            // const options = { value: ethers.parseUnits(String(amountChecked), "wei") }

            questionContract.connect(signer)
            const reciept = await questionContract.addAnswer(answerText)


            setAnswerText('')
        } catch (err) {
            console.log({ err });
        }
    }

    async function cancelQuestion(event) {
        event.preventDefault()
        console.log("Canceling Quiestion")
        console.log(selectedAddress)
        console.log(questionOwner)

        try {
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await web3Provider.getSigner()

            const questionContract = new ethers.Contract(questionsAddress, StackQuestionAbi, signer);

            questionContract.connect(signer)
            const reciept = await questionContract.cancelQuestion()


        } catch (err) {
            console.log({ err });
        }
    }

    async function connectAndGetData(questionsAddress) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        const selectedAddress = accounts[0]
        const balance = await web3Provider.getBalance(accounts[0]);
        const balanceInEther = ethers.formatEther(balance);

        const contractQuestion = new ethers.Contract(questionsAddress, StackQuestionAbi, web3Provider);
        const allAnswers = await contractQuestion.getAllAnswers();
        const answersCounter = Number(await contractQuestion.getAnswersCounter());
        const contractBalance = Number(await contractQuestion.getBalance());
        const bodyText = await contractQuestion.getBodyText();
        const bountyAmount = Number(await contractQuestion.getBountyAmount());
        const contractId = Number(await contractQuestion.getId());
        const isAnswered = await contractQuestion.getIsAnswered();
        const isClosed = await contractQuestion.getIsClosed();
        const questionOwner = await contractQuestion.getOwner();
        const title = await contractQuestion.getTitle();

        console.log("=========================")
        console.log("Post Log")



        console.log(allAnswers);
        console.log(answersCounter);
        console.log(contractBalance);
        console.log(bodyText);
        console.log(bountyAmount);
        console.log(contractId);
        console.log(isAnswered);
        console.log(isClosed);
        console.log(questionOwner);
        console.log(title);

        setSelectedAddress(selectedAddress)

        setAllAnswers(allAnswers)
        setAnswersCounter(answersCounter)
        setContractBalance(contractBalance)
        setBodyText(bodyText)
        setBountyAmount(bountyAmount)
        setContractId(contractId)
        setIsAnswered(isAnswered)
        setIsClosed(isClosed)
        setQuestionOwner(questionOwner)
        setTitle(title)

        contractQuestion.on("answerAddedEvent", async (ev) => {
            console.log("====================")
            console.log("Event Triggerd answerAddedEvent")

            const allAnswers = await contractQuestion.getAllAnswers();
            console.log(allAnswers)
            setAllAnswers(allAnswers)
        })

        contractQuestion.on("answerAcceptedEvent", async (ev) => {
            console.log("====================")
            console.log("Event Triggerd answerAcceptedEvent")

            const allAnswers = await contractQuestion.getAllAnswers();
            const isAnswered = await contractQuestion.getIsAnswered();
            const isClosed = await contractQuestion.getIsClosed();

            console.log(allAnswers)
            console.log(isAnswered)
            console.log(isClosed)
            setAllAnswers(allAnswers)
            setIsAnswered(isAnswered)
            setIsClosed(isClosed)
        })

        contractQuestion.on("cancelQuestionEvent", async (ev) => {
            console.log("====================")
            console.log("Event Triggerd cancelQuestionEvent")

            const allAnswers = await contractQuestion.getAllAnswers();
            const isAnswered = await contractQuestion.getIsAnswered();
            const isClosed = await contractQuestion.getIsClosed();

            console.log(allAnswers)
            console.log(isAnswered)
            console.log(isClosed)
            setAllAnswers(allAnswers)
            setIsAnswered(isAnswered)
            setIsClosed(isClosed)
        })

    }

    useEffect(() => {
        connectAndGetData(questionsAddress);
        console.log("UseEffect didLoad");
    }, []);

    return (
        <div className={style.wrapper}>
            {/* <div>
                <img
                    src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    alt={'alt'}
                    className={style.profileImage} />
            </div> */}

            <div className={style.postMain}>
                <div className={`p-3 ${isClosed ? "bg-zinc-100" : "bg-sky-100"} rounded-xl`}>
                    <div className={style.addressBox}>
                        <span className={style.name}>{"QuestionsAddress: "}</span>
                        <span className={style.address}>@{questionsAddress}</span>
                    </div>

                    <span className={style.addressBox}>
                        <span className={style.name}>{"From: "}</span>
                        <span className={style.address}>{questionOwner}</span>
                    </span>

                    <div className={style.question}>
                        <div className={style.questionTitleBox}>
                            <div className={`${style.questionTitle} grow`}>{title}</div>
                            {/* <div className={`${style.questionTitle} grow-0`}>{bountyAmount}</div>
                        <div className={`grow-0`}><FaEthereum class="text-yellow-400 size-6" /></div> */}
                        </div>
                        <div className={style.questionBody}>{bodyText}</div>

                        <div>
                            {/* 
                        <div>allAnswers: {allAnswers} <br /></div>
                        <div>answersCounter: {answersCounter} <br /></div> */}

                        </div>
                    </div>
                    <div className={style.footer}>
                        <div className={`${style.footerIcon}`}>
                            Is Answered:
                        </div>

                        <div className={`${style.footerIcon} grow ${isAnswered ? "hover:text-[#1d9bf0]" : "hover:text-[#FF0000]"}`}>
                            {isAnswered ? <FaCheck className="text-[#0BDA51]" /> : <ImCross className="text-[#FF0000]" />}
                        </div>

                        <div className={`${style.footerIcon}`}>
                            Is Active:
                        </div>

                        <div className={`${style.footerIcon} grow hover:text-[#1d9bf0]`}>
                            {isClosed ? <FaStop className="text-[#FF0000]" /> : <FaCheck className="text-[#0BDA51]" />}
                        </div>

                        <div className={`${style.questionTitle} grow-0 text-black`}>{bountyAmount}</div>
                        <div className={`grow-0`}><FaEthereum className={`text-yellow-400 size-6`} /></div>

                        {(selectedAddress && questionOwner && selectedAddress.toLowerCase() == questionOwner.toLowerCase() && !isClosed) &&
                            <button className={`${style.questionTitle} bg-zinc-300 hover:bg-zinc-400 rounded-xl p-2 ml-4 grow-0 text-black `} onClick={(event) => {
                                cancelQuestion(event)
                            }}>Cancel</button>
                        }
                    </div>

                </div>
                <div>
                    <div className={`text-xl mt-3`}>Answers</div>
                    <div className={`mt-3 ml-1 flex flex-col gap-5 justify-center justify-items-start`}>
                        {allAnswers && allAnswers.map((a, i) =>
                            <div key={i} className={`p-3 rounded-xl ${a.isCorrect ? "bg-green-200" : "bg-zinc-100"}`}>
                                <div className={`font-bold flex justify-items-center`}>
                                    <div className={`grow`}>
                                        From: <span className={style.address}>{a.owner}</span>
                                    </div>

                                    {(selectedAddress && questionOwner && selectedAddress.toLowerCase() == questionOwner.toLowerCase() && !isClosed) &&
                                        <div>
                                            <button className={` bg-zinc-100 hover:bg-zinc-300 rounded-xl p-2 ml-4 grow-0 text-black `} onClick={(event) => {
                                                acceptAnswer(event, a.id)
                                            }}>
                                                <FaCheck className="text-[#0BDA51]" />
                                            </button>
                                        </div>
                                    }
                                </div>
                                <div className={`p-3`}>{a.bodyText}</div>

                            </div>)}
                        {
                            !isClosed &&
                            <form className={`flex`}>
                                <textarea
                                    className={`w-full h-full rounded-xl p-2 bg-stone-50 text-lg`}
                                    type="text"
                                    placeholder="Write your answer..."
                                    value={answerText}
                                    onChange={(e) => setAnswerText(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className={`self-center grow-0 ml-1 rounded-3xl font-bold rounded-full p-2 bg-sky-500 text-white hover:bg-sky-700`}
                                    onClick={(event) => postAnswer(event)}
                                // className={`${style.submitGeneral} ${(questionText && questionTitle && bountyAmount) ? style.activeSubmit : style.inactiveSubmit}`}

                                >
                                    <IoIosSend className={`size-10`} />
                                </button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionPost