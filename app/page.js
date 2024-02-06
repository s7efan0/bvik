import { Children, useContext } from 'react'
import Sidebar from './components/Sidebar'
import Feed from './components/home/Feed'
import { StackContext } from './context/StackContext'
import Image from 'next/image'
import metamaskLogo from './assets/metamask.png'
import errorImg from './assets/error.png'


import AuthStack from './components/AuthStack'

import { Providers } from './providers';

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#ffffff] font-semibold text-black`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}


export default function Home() {
  return (
    <main className={style.wrapper}>
      <div className={style.content}>
        <AuthStack />
      </div>
    </main>
  )
}
