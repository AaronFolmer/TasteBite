import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Footbar() {
    return(
        <>
            <footer className="bg-red-500">
                <div className="font-serif font-bold flex p-14 justify-center gap-10">
                    <ul>
                        <li>
                            <h1 className="text-black">
                                Acerca do TasteBite
                            </h1>
                        </li>
                        <li>
                            <Link to='/info'>
                                <a href="" className="text-white font-normal hover:border-b hover:border-black">
                                    Quem somos
                                </a>
                            </Link>
                        </li>
                        <li>
                            <a href="" className="text-white font-normal hover:border-b hover:border-black">
                                Recursas e políticas
                            </a>
                        </li>
                        <li>
                            <a href="" className="text-white font-normal hover:border-b hover:border-black">
                                Contacte-nos
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h1 className="text-black">
                                Explorar
                            </h1>
                        </li>
                        <li>
                            <a href="" className="text-white font-normal hover:border-b hover:border-black">
                                Escrever uma avaliação
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footbar