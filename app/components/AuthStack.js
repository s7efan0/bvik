'use client';

import { StackContext } from '../context/StackContext'

import { createContext, useEffect, useState, useContext } from "react";

import Sidebar from "./Sidebar"
import Feed from "./home/Feed"
import Image from 'next/image'

import metamaskLogo from '../assets/metamask.png'
import errorImg from '../assets/error.png'

import { StackQuestionAbi, contractAddress, StackQuestionsManagerAbi } from '../lib/constants';

// const StackQuestionsManagerAbi = [
//     "function getCounter() external view returns(uint256)",
//     "function getBalance() external view returns(uint256)",
//     "function getOwner() external view returns(address)",
//     "function getAllQuestions() external view returns(StackQuestion[] memory)"
// ]

const ethers = require("ethers")

const style = {
    wrapper: `flex justify-center h-screen w-screen select-none bg-[#ffffff] font-semibold text-black`,
    content: `max-w-[1400px] w-full flex justify-between`,
    loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
    walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
    loginContent: `text-3xl font-bold text-center mt-24`,
}

export default function AuthStack() {
    const { appStatus, connectToWallet, currentAccount } = useContext(StackContext)
    // const { appStatus, connectToWallet, currentAccount, selectedAddress, accountBalance, contractManagerOwner, contractNumberOfComments, contactBalance, questionManagerContract } = useContext(StackContext)
    const [selectedAddress, setSelectedAddress] = useState()
    const [accountBalance, setAccountBalance] = useState()
    const [blockNumber, setBlockNumber] = useState()

    const [contractManagerOwner, setContractManagerOwner] = useState()
    const [contractNumberOfQuestions, setContractNumberOfQuestions] = useState()
    const [contactBalance, setContactBalance] = useState()
    const [questionsArray, setQuestionsArray] = useState([])

    async function connectAndGetData() {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        // const accounts = await provider.send("eth_requestAccounts", []);
        const balance = await web3Provider.getBalance(accounts[0]);
        const balanceInEther = ethers.formatEther(balance);

        setAccountBalance(balanceInEther)
        // this.setState({ selectedAddress: accounts[0] })
        setSelectedAddress(accounts[0])

        const contractManager = new ethers.Contract(contractAddress, StackQuestionsManagerAbi, web3Provider);
        const owner = await contractManager.getOwner()
        const counter = Number(await contractManager.getCounter())
        const contactBalance = Number(await contractManager.getBalance())
        const questionsArr = await contractManager.getAllQuestions()

        console.log(questionsArr)


        contractManager.on("StackQuestionsCreated", async (eventOwner, eventId, eventTitle, eventBodyText, event) => {
            console.log("====================")
            console.log("Event Triggerd StackQuestionsCreated")
            console.log({
                eventOwner: eventOwner,
                eventId: eventId,
                eventTitle: eventTitle,
                eventBodyText: eventBodyText
            });

            const questionsArr = await contractManager.getAllQuestions()
            const contactBalance = Number(await contractManager.getBalance())

            console.log("Event Updated list of questions is:")
            console.log(questionsArr)

            setQuestionsArray(questionsArr)
            setContactBalance(contactBalance)
        })

        contractManager.on("withdrawCalled", async (eventOwner, event) => {
            console.log("====================")
            console.log("Event Triggerd withdrawCalled")
            console.log({
                eventOwner: eventOwner
            });

            const contactBalance = Number(await contractManager.getBalance())

            console.log("Event Updated contact balance is:")
            console.log(contactBalance)

            setContactBalance(contactBalance)
        })

        setContractManagerOwner(owner)
        setContractNumberOfQuestions(counter)
        setContactBalance(contactBalance)
        setQuestionsArray(questionsArr)
    }

    useEffect(() => {
        if (appStatus == 'connected') {
            connectAndGetData();
            console.log("UseEffect didLoad")
        }
    }, [appStatus]);

    const app = (status = appStatus) => {
        switch (status) {
            case 'connected':
                return userLoggedIn

            case 'notConnected':
                return noUserFound

            case 'noMetaMask':
                return noMetaMaskFound

            case 'error':
                return error

            default:
                return loading
        }
    }

    const userLoggedIn = (
        <div className={style.content}>
            <Sidebar
                selectedAddres={selectedAddress}
                contractManagerOwner={contractManagerOwner}
                contactBalance={contactBalance}
            />
            <Feed
                contractManagerOwner={contractManagerOwner}
                contractNumberOfComments={contractNumberOfQuestions}
                contactBalance={contactBalance}
                questionsArray={questionsArray}
            />
            {/* <div>
                <div>Current Account: {currentAccount}</div>
                <div>Selected Addresss: {selectedAddress}</div>
                <div>Account Balance: {accountBalance}</div>
                <div>Block Number: 0</div>
                <div>contractManagerOwner: {contractManagerOwner}</div>
                <div>contractNumberOfComments: {contractNumberOfQuestions}</div>
                <div>contactBalance: {contactBalance}</div>
                {
                    questionsArray.map((qu, i) => <div key={i}>
                        {qu}
                    </div>)

                }
                <button onClick={() => connectAndGetData()}>Connect to Metamask</button>
            </div> */}
        </div>
    )

    const noUserFound = (
        <div className={style.loginContainer}>
            <Image src={metamaskLogo} width={200} height={200} />

            <div className={style.walletConnectButton} onClick={() => connectToWallet()}>
                Connect Wallet
            </div>
            <div className={style.loginContent}>Connect To Wallet</div>
        </div>
    )

    const noMetaMaskFound = (
        <div>
            <Image src={metamaskLogo} height={200} width={200} />
            <div>
                <a
                    target='_blank'
                    rel='noreferrer'
                    href={`https://metamask.io/download.html`}
                >
                    You must install Metamask, <br /> a virtual Ethereum wallet, in your browser.
                </a>
            </div>
        </div>
    )

    const error = (
        <div className={style.loginContainer}>
            <Image src={errorImg} height={250} width={250} />
            <div className={style.loginContent}>
                An error occurred. Please try again later or use another!
            </div>
        </div>
    )

    const loading = (
        <div className={style.loginContainer}>
            <div className={style.loginContent}>Loading...</div>
        </div>
    )

    return (
        <div className={style.wrapper}>
            {app(appStatus)}
        </div>
    )
}
