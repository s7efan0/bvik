"use client";

import Link from "next/link";

import { RiStackOverflowLine } from "react-icons/ri";
import SidebarOption from './SidebarOption'
import { useEffect, useState } from 'react';

import { RiQuestionnaireFill, RiQuestionnaireLine } from "react-icons/ri";
import { AiOutlineTags, AiFillTags } from "react-icons/ai";
import { PiUsers, PiUsersFill } from "react-icons/pi";

import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from 'react-icons/ri'
import { FiMoreHorizontal } from 'react-icons/fi'
import { StackQuestionsManagerAbi, contractAddress } from "../lib/constants";


const ethers = require("ethers")

const style = {
    wrapper: `flex-[0.7] px-8 flex flex-col`,
    twitterIconContainer: `text-3xl m-4`,
    withdrawButton: `flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] text-xl `,
    navContainer: `flex-1`,
    profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#f1f2f3]`,
    profileLeft: `flex item-center justify-center mr-4`,
    profileImage: `height-12 w-12 rounded-full`,
    profileRight: `flex-1 flex`,
    details: `flex-1`,
    name: `text-lg`,
    handle: `text-[#8899a6]`,
    moreContainer: `flex items-center mr-2`,
    inactiveSubmit: `bg-orange-800 hover:bg-orange-800 cursor-default text-[#95999e]`,
    activeSubmit: `bg-orange-400 hover:bg-orange-600 cursor-pointer text-white`,
}

function Sidebar({
    selectedAddres,
    contractManagerOwner,
    contactBalance }) {

    const [selected, setSelected] = useState('Home');

    async function withdrawFromContract() {

        try {
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await web3Provider.getSigner()


            const contractManager = new ethers.Contract(contractAddress, StackQuestionsManagerAbi, signer);
            contractManager.connect(signer)

            const response = await contractManager.withdraw()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className={style.wrapper}>
            <div className={style.twitterIconContainer}>
                <RiStackOverflowLine />
            </div>
            <div className={style.navContainer}>
                <SidebarOption
                    Icon={selected == 'Home' ? RiHome7Fill : RiHome7Line}
                    text='Home'
                    isActive={Boolean(selected == 'Home')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    Icon={selected == 'Questions' ? RiQuestionnaireFill : RiQuestionnaireLine}
                    text='Questions'
                    isActive={Boolean(selected == 'Questions')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    Icon={selected == 'Tags' ? AiFillTags : AiOutlineTags}
                    text='Tags'
                    isActive={Boolean(selected == 'Tags')}
                    setSelected={setSelected}
                />
                <SidebarOption
                    Icon={selected == 'Users' ? PiUsersFill : PiUsers}
                    text='Users'
                    isActive={Boolean(selected == 'Users')}
                    setSelected={setSelected}
                    redirect={'/profile'}
                />

                <div
                    className={`flex flex-col `}
                >
                    <button
                        onClick={() => { withdrawFromContract() }}
                        className={`${style.withdrawButton} ${(contractManagerOwner && selectedAddres && contractManagerOwner.toLowerCase() == selectedAddres.toLowerCase()) ? style.activeSubmit : style.inactiveSubmit}`}
                        disabled={!(contractManagerOwner && selectedAddres && contractManagerOwner.toLowerCase() == selectedAddres.toLowerCase())}

                    >
                        Withdraw
                    </button>
                    <div className={`flex-wrap text-center m-3`}>
                        Contract Balance: {contactBalance} WEI
                    </div>
                </div>
            </div>
            <div className={style.profileButton}>
                <div className={style.profileLeft}></div>
                <div className={style.profileRight}>
                    <div className={style.details}>
                        <div className={style.name}>Current User Address:</div>
                        <div className={style.handle}>@{selectedAddres}</div>
                    </div>
                    {/* <div className={style.moreContainer}>
                        <FiMoreHorizontal />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;

