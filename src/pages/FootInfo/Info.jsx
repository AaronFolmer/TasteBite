import React from 'react'

// layouts
import Footbar from '../../layouts/Foot/Footbar'

// components
import Return from '../../components/Return'

function Info()  {
    return(
        <>
            <Return/>
            <section id="main" className='mb-[50%]'>
                <div id="topwrap">
                    <img 
                        src="https://images.pexels.com/photos/16134565/pexels-photo-16134565/free-photo-of-citrico-delicioso-saboroso-gostoso.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                        alt="restaurant_image" 
                        className='w-[100%] h-[500px] object-cover'
                    />
                    <div className='m-52 mt-14'>
                        <h1 className="font-['Inter'] font-bold text-3xl mb-14">
                            Acerca do Taste Bite
                        </h1>
                        <hr className='border-2 border-black' />
                    </div>
                </div>

                {/* about */}

                <div className='mt-24 m-80'>
                    <p className="text-justify font-['Inter'] text-2xl font-normal">
                        O Taste Bite começou da vontade de aventurar-se em novos lugares para comer. Na nova app podes pesquisar e descobrir restaurantes, ver informações, fotografias e menus, e consultar reviews de outros utilizadores.
                        <br /><br />
                        Uma só app, toda a experiência, a Taste Bite é a única aplicação de que precisas para todas as tuas experiências gastronómicas.
                    </p>
                </div>

                {/* slogan and info */}

                <div id="slogan" className=''>
                    <h1 className="font-['Inter'] font-bold text-3xl mb-14">
                        
                    </h1>
                </div>

            </section>
            <Footbar/>
        </>
    )
}

export default Info;