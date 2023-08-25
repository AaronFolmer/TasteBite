
// layouts

import Topbar from "../../layouts/TopBar/Topbar"
import Footbar from '../../layouts/Foot/Footbar'

// components

import MainCenter from '../../components/MainPage/MainCenter'

// pages

import FeedPage from '../../pages/MainSection/Feed/FeedPage'

// react

import React, { useEffect } from 'react'

// firebase auth 

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'

//

import MainPageBg from '../../assets/mainpage.jpg'


function MainPage() {

    //

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // user is signed in

            } else {
                // user is signed out

            }

        })
    }, [])

    return(
        <>
            <Topbar/>
            <section>
                <MainCenter/>
                <img 
                    src={MainPageBg}
                    alt="bg"
                    className=""
                />
            </section>
            <FeedPage/>
            <Footbar/>
        </>
    )
}

export default MainPage