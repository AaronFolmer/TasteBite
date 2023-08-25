import Footbar from '../../layouts/Foot/Footbar'
import React, {
    useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import Return from '../../components/Return'

// firebase 

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'


function Register() {

    // register

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() 

        await createUserWithEmailAndPassword(auth, email, password)
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
    }

    return(
        <>
        <Return/>
            <div className="block m-auto w-2/4 p-20">
                <h1 className="font-['Inter'] text-5xl font-bold">
                    Seja bem vindo!
                </h1>
                <h2 className="font-['Inter'] text-2xl mt-4 mb-10">
                    Encontra as melhores mordidas ao seu redor! <span role="img" aria-label="handshake">👋</span>
                </h2>
                <hr />
                <div className='mb-12'>

                </div>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <label htmlFor="email" className="font-['Inter'] font-bold text-3xl">Email</label>
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            size="30"
                            className="h-12 bg-slate-100 placeholder-[#475569] rounded-lg border-none font-['Inter'] text-xl p-5 focus:rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label htmlFor="password" className="font-['Inter'] font-bold text-3xl">Palavra-Passe</label>
                        <input 
                            type="password" 
                            placeholder="Palavra-passe"
                            size="30"
                            className="h-12 bg-slate-100 placeholder-[#475569] rounded-lg border-none font-['Inter'] text-xl p-5 focus:rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <button
                            type="submit"   
                            className="mx-[35%] p-3 w-[30%] bg-black font-['Inter'] font-bold rounded text-white cursor-pointer transition duration-500 hover:bg-green-500"
                        >
                            Registar
                        </button>
                    </form>
                </div>
            </div>
            <br />
            <br />
            <Footbar/>
        </>
    )
}

export default Register