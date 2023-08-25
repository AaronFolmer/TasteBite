import React, { useState } from 'react'



// components

function ProfileNavSettings({ handlePageChange }) {

    const [activePage, setActivePage] = useState('');

    const handleClick = (page) => {
        setActivePage(page);
        handlePageChange(page);
    };


    return(
        <>
            <div className="font-['Inter'] font-medium text-xl mt-8">
                <ul className="flex w-[100%] justify-center bg-[#475569] bg-opacity-10 p-1 rounded-md">
                    <li
                        className={`hover:text-red-500 hover:bg-white hover:shadow-md rounded-md pl-10 pr-10 p-2 cursor-pointer`}
                        onClick={() => handlePageChange('perfil')}
                    >
                        Perfil
                    </li>
                    <li
                        className={`hover:text-red-500 hover:bg-white hover:shadow-md rounded-md pl-10 pr-10 p-2 cursor-pointer`}
                        onClick={() => handlePageChange('password')}
                    >
                        Password
                    </li>
                    <li
                        className={`hover:text-red-500 hover:bg-white hover:shadow-md rounded-md pl-10 pr-10 p-2 cursor-pointer`}
                        onClick={() => handlePageChange('favoritos')}
                    >
                        Avaliações
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ProfileNavSettings