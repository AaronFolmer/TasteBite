import Footbar from '../../../layouts/Foot/Footbar'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


// icons

import Icon from '@mdi/react';
import { mdiArrowLeftThin } from '@mdi/js';

// firebase 

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../utils/firebase';

function Login() {

    // login

    const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
    
        try {
          await sendPasswordResetEmail(auth, email);
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          
        }

        const errorDiv = document.getElementById('avisoEnviado')
        errorDiv.classList.remove("hidden")
      };



    return(
        <>
            <div className="block m-auto w-2/4 p-40">
                <div>
                    <h2 id="avisoEnviado" className="font-['Inter'] text-xl text-center bg-green-200 border-2 border-green-500 rounded-lg p-3 hidden">
                        Email enviado!
                    </h2>
                </div>
                <br/>
                <h1 className="font-['Inter'] text-5xl font-bold">
                    Esqueceu sua palavra-passe?
                </h1>
                <br />
                <h2 className="font-['Inter'] text-xl mt-2">
                    Sem problemas, podemos te ajudar enviando um email. <span role="img" aria-label="handshake">🆘</span>
                </h2>
                <br />
                <hr />
                <br />
                <div>
                    <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
                        <label htmlFor="email" className="font-['Inter'] font-bold text-xl"> Seu e-mail</label>
                        <input 
                            type="email" 
                            placeholder=" E-mail"
                            size="30"
                            className="h-12 bg-slate-100 rounded-lg border-none font-['Inter'] text-xl p-5 focus:rounded-md" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <button
                            type="submit"
                            className="p-5 text-center bg-black rounded font-['Inter'] text-white cursor-pointer transition duration-500 hover:bg-green-500">
                            Enviar
                        </button>
                        <div className="flex justify-center">
                            <Icon path={mdiArrowLeftThin} size={1.5} />
                            <Link to="/login"> 
                                <p className="mt-1 ml-5 font-['Inter'] text-xl cursor-pointer hover:underline hover:text-red-500">Voltar para login</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footbar/>
        </>
    )
}

export default Login