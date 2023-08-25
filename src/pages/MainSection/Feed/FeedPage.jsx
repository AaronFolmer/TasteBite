import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// outside

import { register } from 'swiper/element';
import SwiperCore, { Navigation } from 'swiper'

//

//import ClipLoader from 'react-spinners/ClipLoader';

// icons

import { mdiArrowLeftCircle, mdiArrowRightCircle, mdiHeartOutline, mdiHeart } from '@mdi/js';
import Icon from '@mdi/react'

// firebase

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { collection, doc, getDocs, query, where, updateDoc, increment , onSnapshot}  from 'firebase/firestore';
import { firestore } from '../../../utils/firebase' 

function clearUserLikes() {
  localStorage.removeItem('userLikes');
}


function FeedPage() {

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  const storageRef = ref(storage, 'restaurants');
  const swiperElRef = useRef(null);
  /*const [user, setUser] = useState({
    displayName: '',
    email: '',
    avatarURL: '',
    likes: [] // Adicione esse campo para armazenar os IDs dos restaurantes curtidos
  });*/

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const restaurantsCollection = collection(firestore, 'restaurants');
      const q = query(restaurantsCollection);

      try {
        const querySnapshot = await getDocs(q);
        const imageData = [];

        const downloadPromises = querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageObj = {
            src: '',
            title: data.title,
            price: data.price,
            email: data.email,
            tel: data.email,
            site: data.site,
            loc: data.loc,
            food: data.food,
            id: doc.id,
            likes: data.likes,
            likedByUser: false,
          };

          try {
            const url = await getDownloadURL(
              ref(storageRef, `${doc.id}.jpg`)
            );
            imageObj.src = url;
            imageData.push(imageObj);
          } catch (error) {
            console.log('Erro ao obter a URL', error);
          }
        });

        await Promise.all(downloadPromises);

        const updatedImages = imageData.map((image) => {
          const liked = auth.currentUser && localStorage.getItem(`liked_${image.id}`);
          return {
            ...image,
            likedByUser: liked ? true : false,
          };
        });
      
        setLoading(false);
        setImages(updatedImages);

      } catch (error) {
        console.log('Erro ao buscar os dados na Firebase', error);
      }
    };

    fetchRestaurantData();
  }, []);

  const handleLike = async (index) => {
    if (!auth.currentUser) {
      // Verificar se o usuário está autenticado antes de permitir dar like
      navigate('/login');
      return;
    }

    const updatedImages = [...images];
    const image = { ...updatedImages[index] };

    // Obtém o ID do restaurante
    const restaurantId = updatedImages[index].id;

    // Verifica se o usuário curtiu ou descurtiu o restaurante
    const likedByUser = updatedImages[index].likedByUser;

    // Adiciona ou remove o ID do restaurante no array de likes do usuário
    if (likedByUser) {
      // Remove o restaurante dos likes do usuário
      const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
      const updatedLikes = userLikes.filter((like) => like !== restaurantId);
      localStorage.setItem('userLikes', JSON.stringify(updatedLikes));
      image.likes--;
      localStorage.removeItem(`liked_${image.id}`);
    } else {
      // Adiciona o restaurante aos likes do usuário
      const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
      const updatedLikes = [...userLikes, restaurantId];
      localStorage.setItem('userLikes', JSON.stringify(updatedLikes));
      image.likes++;
      localStorage.setItem(`liked_${image.id}`, 'true');
    }

    image.likedByUser = !image.likedByUser;
    updatedImages[index] = image;

    setImages(updatedImages);

    try {
      const restaurantRef = doc(firestore, 'restaurants', image.id);
      await updateDoc(restaurantRef, { likes: image.likes });
    } catch (error) {
      console.log('Erro ao atualizar o número de likes na base de dados', error);
    }
  };

  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setImages(prevImages => {
          const updatedImages = prevImages.map((image) => ({
            ...image,
            likedByUser: user ? localStorage.getItem(`liked_${image.id}`) : false,
          }));
          return updatedImages;
        });
    
        if (!user) {
          clearUserLikes();
        }
      });
    
      return () => unsubscribe();
    }, [auth]);
    

    

  
    // swiper
    register();
    
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
          
            {/* best reviews */}

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

                <div className="flex">
                    <button className="prevEl h-0 mt-48 mr-10"><Icon path={mdiArrowLeftCircle} size={1.5} color={"rgb(239 68 68"}/></button>
                    <swiper-container 
                        ref={swiperElRef} 
                        slides-per-view="5" 
                        space-between="50"
                    >
                        <swiper-navigation prevEl=".prevEl" nextEl=".nextEl"/>
                        {images.map((image, index) => (
                          <>
                            <swiper-slide key={index}>
                            <Link to={`/restaurant/${image.id}`} key={index}>
                                <img src={image.src} alt={image.title} className="rounded-lg shadow-lg object-cover cursor-pointer w-[333px] h-[350px] hover:opacity-80" />
                                <br />
                                <h1 className="font-serif font-bold text-xl cursor-pointer hover:underline hover:text-red-500">{image.title}</h1>
                            </Link>
                              <div className='flex'>
                                <Icon path={mdiHeartOutline} size={1}/>
                                <p className='text-xl font-normal mt-[-1.5%] ml-[2%]'>
                                  {image.likes}
                                </p>
                              </div>
                            </swiper-slide>
                          </>
                        ))}   
                    </swiper-container> 
                    <button className="nextEl h-0 mt-48 ml-10"><Icon path={mdiArrowRightCircle} size={1.5} color={"rgb(239 68 68"} /></button>
                </div>  
            </section>

            {/* feed */}

            <div className='mx-[15%] relative cursor-pointer'>
                <img 
                    src="https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    alt="lisbon"
                    className='relative w-full h-[400px] rounded-lg object-cover' 
                />
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70'></div>
                <h1 className="font-['Inter'] font-bold text-4xl absolute bottom-12 left-10 text-white hover:text-[#EF4444] hover:underline hover:underline-offset-8">
                    Perto de si - Lisboa
                </h1>
            </div>
            <section 
              id="feed" 
              className='mx-[15%] mb-[20%] mt-32 grid grid-cols-3 grid-rows-3 gap-y-16 '
            >
                {images.map((image, index) => (
                    <div id="restaurant" className='w-[80%]'>
                      <Link to={`/restaurant/${image.id}`} key={index}>
                        <img src={image.src} alt="" className='rounded-lg shadow-lg object-cover cursor-pointer w-[333px] h-[350px] hover:opacity-80' />
                        <br />
                        <h1 className="font-serif font-bold text-xl cursor-pointer hover:underline hover:text-red-500">
                            {image.title}
                        </h1>
                      </Link>         
                        <div id="likes" className='flex'>
                          <button 
                            id="like" 
                            className={`mt-2 transition duration-500 ${
                              image.likedByUser ? 'opacity-80' : 'opacity-100'
                            }`}
                            onClick={() => handleLike(index)}
                          >
                            {image.likedByUser ?  (
                              <Icon path={mdiHeart} size={1} color='red'/>
                            ) : (
                              <Icon path={mdiHeartOutline} size={1}/>
                            )}
                          </button>
                          <p className="text-xl font-normal mt-[1.5%] ml-[2%] mr-[3.5%]">
                            {image.likes}
                          </p>
                        </div>
                        <p className='font-normal text-lg mt-2'>
                            A partir de {image.price}
                        </p>     
                    </div>
                ))}
            </section> 
        </>
    )
}

export default FeedPage