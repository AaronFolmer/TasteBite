import React, { useRef, useEffect } from 'react'
import { register } from 'swiper/element';
import SwiperCore, { Navigation } from 'swiper'
import Icon from '@mdi/react'
import { mdiArrowLeftCircle, mdiArrowRightCircle } from '@mdi/js';

// jsx

import StarsReview from '../../components/StarsReview'

// images

/*const images = [
    {
        src: "https://d2gi7vg84kjm7x.cloudfront.net/store/0d86514854a64796523498b6d9e774e8.jpg",
        title: "Curva",
        price: "A partir de 3€",
    },
    {
        src: "https://d2gi7vg84kjm7x.cloudfront.net/store/4824a27cb9abf646d960efac61961e3f.jpg",
        title: "Marquise",
        price: "A partir de 7€",
    },
    {
        src: "https://d2gi7vg84kjm7x.cloudfront.net/store/c38dfd4e8766fc73cf2d409ca06e7e0b.jpg",
        title: "The Folks",
        price: "A partir de 12€",
    },
    {
        src: "https://d2gi7vg84kjm7x.cloudfront.net/store/d0743c5a1f5800aa617b45f4acc9b59d.jpg",
        title: "São",
        price: "A partir de 6€",
    },
    {
        src: "https://d2gi7vg84kjm7x.cloudfront.net/store/89879f141c1bb2eabbf2ccee0b4cf2a1.jpg",
        title: "Seagull Method",
        price: "A partir de 3€",
    },
]*/


const BestReviewPage = () => {



    // swiper
    register();

    const swiperElRef = useRef(null)

    useEffect(() => {

        // listen for Swiper events using addEventListener
        swiperElRef.current.addEventListener('progress', (e) => {
            
        });
    
        swiperElRef.current.addEventListener('slidechange', (e) => {
            
        });

        // navigation swiper

        SwiperCore.use([Navigation])

        const swiper = swiperElRef.current.swiper

        const prevButton = document.querySelector('.prevEl')
        const nextButton = document.querySelector('.nextEl')
        prevButton.addEventListener('click', () => swiper.slidePrev())
        nextButton.addEventListener('click', () => swiper.slideNext())

    }, []);

    return(
        <>
            <section className="m-52 mb-16">

                <div className="ml-[4.5rem]">
                    <h2 className="font-['Inter'] text-4xl font-bold">
                        Melhores mordidas perto de si!
                    </h2>
                    <p className="font-['Inter'] text-2xl font-medium mt-4 mb-10">
                        Os mais bem avaliados da sua região.
                    </p>
                    <br/>
                </div>

                {/*
                    Carousel
                */}

                <div className="flex w-2/3">
                    <button className="prevEl h-0 mt-48 mr-10"><Icon path={mdiArrowLeftCircle} size={1.5} color={"rgb(239 68 68"}/></button>
                    <swiper-container 
                        ref={swiperElRef} 
                        slides-per-view="3" 
                        space-between="50"
                    >
                        <swiper-navigation prevEl=".prevEl" nextEl=".nextEl"/>
                        {images.map((image, index) => (
                            <swiper-slide key={index}>
                                <img src={image.src} alt={image.title} className="rounded-lg shadow-lg object-cover cursor-pointer w-[333px] h-[350px] hover:opacity-80" />
                                <br />
                                <h1 className="font-serif font-bold text-xl cursor-pointer hover:underline hover:text-red-500">{image.title}</h1>
                                <StarsReview/>
                                <p className="font-normal text-lg ">{image.price}</p>
                            </swiper-slide>
                        ))}   
                    </swiper-container> 
                    <button className="nextEl h-0 mt-48 ml-10"><Icon path={mdiArrowRightCircle} size={1.5} color={"rgb(239 68 68"} /></button>
                </div>  
            </section>
        </>
    )
}


export default BestReviewPage