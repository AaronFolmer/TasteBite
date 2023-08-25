
// react

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// firebase

import { auth } from '../../utils/firebase'
import { signOut } from 'firebase/auth'

function Topbar() {

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const [displayName, setDisplayName] = useState('');


    // logout
    

    const handleLogout = () => {
        signOut(auth).then(() => {
            // sign out success
            navigate('/')
            auth.signOut()
            console.log("signed out success!")
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
        })
    }


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setLoggedIn(true)
                setDisplayName(user.displayName);
            } else {
                setLoggedIn(false)
            }
        })
    }, [])

    // scroll animation nav

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        function handleScroll() {
            if( window.scrollY > 0)  {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll);

        return() => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    //

    return(
        <>
            <div className={`font-serif font-bold overflow-hidden fixed top-0 w-full z-20 transition duration-300 ${scrolled ? 'bg-black' : ''}`}>
                <ul className="flex align-middle float-right p-6">   
                    { loggedIn ? (
                        <>
                            <li className='pr-4'>
                                <button 
                                        className="p-2.5 px-10 rounded text-white transition duration-300 hover:bg-white hover:bg-opacity-10"
                                >
                                {displayName}
                                </button>
                            </li>
                            <li className="pr-4">
                                <Link to='/profile'>
                                    <button className="p-2 px-4 border-2 rounded text-white transition duration-300 hover:bg-white hover:bg-opacity-10">
                                        Perfil
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    <button onClick={handleLogout} className="p-2.5 px-4 bg-red-500 rounded text-white">
                                        Sair
                                    </button>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="pr-4">
                                <Link to='/login'>
                                    <button className="p-2 px-4 border-2 rounded text-white transition duration-300 hover:bg-white hover:bg-opacity-10">
                                        Entrar
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <button className="p-2 px-4  bg-red-500 rounded text-white">
                                        Regista-te
                                    </button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>                    
        </>
    )
}

export default Topbar