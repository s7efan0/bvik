'use client';

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, useContext } from "react";

export const StackContext = createContext()

export const StackProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('')

    // const [selectedAddress, setSelectedAddress] = useState()
    // const [accountBalance, setAccountBalance] = useState()

    // const [contractManagerOwner, setContractManagerOwner] = useState()
    // const [contractNumberOfComments, setContractNumberOfComments] = useState()
    // const [contactBalance, setContactBalance] = useState()

    // const [questionManagerContract, setQuestionManagerContract] = useState()

    const router = useRouter();

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if (addressArray.length > 0) {
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
            } else {
                router.push('/')
                setAppStatus('notConnected')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const connectToWallet = async () => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            setAppStatus('loading')

            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            if (addressArray.length > 0) {
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])

                // const web3Provider = new ethers.BrowserProvider(window.ethereum);
                // const accounts = await web3Provider.send("eth_requestAccounts", []);
                // const balance = await web3Provider.getBalance(accounts[0]);
                // const balanceInEther = ethers.formatEther(balance);

                // setAccountBalance(balanceInEther)
                // setSelectedAddress(accounts[0])

                // const contractManager = new ethers.Contract(contractAddress, StackQuestionsManagerAbi, web3Provider);
                // const contractManagerOwner = await contractManager.getOwner()
                // const counter = Number(await contractManager.getCounter())
                // const contactBalance = Number(await contractManager.getBalance())


                // setContractManagerOwner(contractManagerOwner)
                // setContractNumberOfComments(counter)
                // setContactBalance(contactBalance)
                // setQuestionManagerContract(contractManager)

                // console.log(owner)
                // console.log(counter)
                // console.log(contactBalance)
                // console.log(typeof (owner))
                // console.log(typeof (counter))
                // console.log(typeof (contactBalance))

            } else {
                router.push('/')
                setAppStatus('notConnected')
            }
        } catch (error) {
            setAppStatus('error')
        }
    }

    return (
        <StackContext.Provider value={{ appStatus, connectToWallet, currentAccount }}>
            {children}
        </StackContext.Provider>
    )
}
