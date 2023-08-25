import Footbar from '../../layouts/Foot/Footbar'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Return from '../../components/Return'

// firebase 

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'



/*const getAccounts = async () => {
    const querySnapshot = await getDocs(accountsRef)
    const accounts = querySnapshot.docs.map((doc) =>doc.data())
    console.log(accounts)
} VERIFICAR CONTAS */ 


function Login() {

    // login

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // signed in
                const user = userCredential.user
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })

            const errorDiv = document.getElementById('errorCred')
            errorDiv.classList.remove("hidden")
    }




    return(
        <>
            <Return/>
            <div className="block m-auto w-2/4 p-20">
                <div>
                    <h2 id="errorCred" className="font-['Inter'] text-xl text-center bg-red-200 border-2 border-red-500 rounded-lg p-3 hidden">
                        Credenciais inválidas!
                    </h2>
                </div>
                <br/>
                <h1 className="font-['Inter'] text-5xl font-bold">
                    Bem vindo de volta!
                </h1>
                <h2 className="font-['Inter'] text-xl mt-4 mb-10">
                    Olá de volta, volte a encontrar as melhores mordidas ao seu redor! <span role="img" aria-label="handshake">👋</span>
                </h2>
                <hr />
                <hr />
                <div className='mb-12'>

                </div>
                <div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <label htmlFor="email" className="font-['Inter'] font-bold text-2xl">Email</label>
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            size="30"
                            className="h-12 bg-slate-100 rounded-lg border-none font-['Inter'] placeholder-[#475569] text-xl p-5 focus:rounded-md" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password" className="font-['Inter'] font-bold text-2xl">Palavra-Passe</label>
                        <input 
                            type="password" 
                            placeholder="Palavra-passe"
                            size="30"
                            className="h-12 bg-slate-100 rounded-lg border-none font-['Inter'] placeholder-[#475569] text-xl p-5 focus:rounded-md" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex p-2">
                            <Link to="/recover-password">
                                <a className="font-['Inter'] text-xl  cursor-pointer text-red-500 hover:underline">Esqueceu a sua palavra-passe?</a>
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="mx-[35%] mt-14 p-3 w-[30%] text-center bg-black rounded font-['Inter'] font-bold text-white cursor-pointer transition duration-500 hover:bg-green-500">
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <Footbar/>
        </>
    )
}

export default Login