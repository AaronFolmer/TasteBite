import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'


// components

import Return from '../../components/Return'
import Avatar from '../../assets/avatar.jpg';

// layouts

import Footbar from '../../layouts/Foot/Footbar'

// mdiicons

import Icon from '@mdi/react';
import { mdiLaptop } from '@mdi/js';
import { mdiPhone } from '@mdi/js';
import { mdiEmailOutline } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js'

// react spinners

import { ClipLoader } from 'react-spinners';



// firebase

import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { doc, getDocs, getDoc, collection, query, where }  from 'firebase/firestore';
import { firestore } from '../../utils/firebase' 

const storage = getStorage();
const storageRef = ref(storage, 'restaurants');


function ResPage() {

    const { id } = useParams()
    const [restaurantData, setRestaurantData] = useState(null)
    const [reviews, setReviews] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = getAuth();
    

    // restaurntfetch

    useEffect(() => {

      const fetchRestaurantData = async () => {
        try {
          const docRef = doc(firestore, 'restaurants', id);
          const docSnapshot = await getDoc(docRef);
  
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setRestaurantData(data);
          } else {
            console.log('Documento não encontrado');
          }
        } catch (error) {
          console.log('Erro ao buscar restaurante', error);
        }
      };
  
      /*const fetchRestaurantImage = async () => {
        try {
          const imageUrl = await getDownloadURL(ref(storageRef, `${id}.jpg`));
          setRestaurantData((prevData) => ({
            ...prevData,
            imageUrl: imageUrl,
          }));
        } catch (error) {
          console.log('Erro ao buscar a imagem do restaurante', error);
        }
      };*/

      const fetchRestaurantImage = async () => {
        try {
          const url = await getDownloadURL(ref(storageRef, `${id}.jpg`));
          setImageUrl(url);
        } catch (error) {
          console.log('Erro ao buscar a imagem do restaurante', error);
        } finally {
          setLoading(false);
        }
      };


      const fetchReviews = async () => {
        try {
          const reviewsCollectionRef = collection(firestore, 'reviews');
          const q = query(reviewsCollectionRef, where('restaurantId', '==', id));
          const querySnapshot = await getDocs(q);
          const reviewsData = [];
      
          querySnapshot.forEach(async (doc) => {
            const review = doc.data();
      
            reviewsData.push(review);
          });
      
          setReviews(reviewsData);
        } catch (error) {
          console.log('Erro ao buscar as avaliações', error);
        }
      };


      // timeout
      setTimeout(() => {
        fetchReviews();
        fetchRestaurantData();
        fetchRestaurantImage();
      }, 500);
    }, [id]);


    // reviewrender
  
    const renderReviews = () => {
      if (reviews.length === 0) {
        return <p>Nenhuma avaliação encontrada.</p>;
      }
    
      return reviews.map((review) => (
        <div key={review.id} className='flex p-10 border-[1px] mb-10 w-[70%]'>
          <div className='ml-2'>
            <img src={review.userAvatarURL || Avatar} alt="pfp" className='w-[70px] h-[70px] rounded-full object-cover text-sm' />
            <p className="font-['Inter'] text-sm p-3">{review.userName}</p>
          </div>

          <div className='block ml-10'>
            <h3 className="mt-4 font-['Inter'] font-bold text-xl">{review.title}</h3>
            <p className="font-['Inter'] text-lg">{review.text}</p>
          </div> 
        </div>
      ));
    };
    
  
    if (!restaurantData || loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader
            color="#000000"
            loading={true}
          />
        </div>
      );
    }

    const handleWriteReview = () => {
      if (!auth.currentUser) {
        navigate(`/login`);
      } else {
        navigate(`/reviews/${id}`);
      }
    };


    

    return(
        <>
                <Return/>
                <section className='ml-[10%] flex'>
                    {/*<img 
                        src={restaurantData.imageUrl} 
                        alt={restaurantData.title} 
                        className='rounded-lg shadow-lg object-cover w-[45%] h-[350px]' 
                    />*/}
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={restaurantData.title}
                        className="rounded-lg shadow-lg object-cover w-[45%] h-[350px]"
                      />
                    ) : (
                      <img
                        src={Avatar}
                        alt={restaurantData.title}
                        className="rounded-lg shadow-lg object-cover w-[45%] h-[350px]"
                      />
                    )}
                    <div className='ml-[5%]'>
                        <h1 className="font-serif font-bold text-4xl transition duration-200 cursor-pointer hover:underline hover:text-red-500">
                            {restaurantData.title}
                        </h1>
                        <p className='mt-4 mb-2 font-normal text-2xl text-[#364652]'>
                            {restaurantData.loc}
                        </p> 
                        <div className='flex'>
                            <Icon path={mdiHeartOutline} size={1.3} className='mt-4 mb-6' />
                            <p className='mt-3.5 ml-2 font-normal text-2xl text-[#364652]'>
                                {restaurantData.likes}
                            </p>
                        </div>
                    </div> 
                </section>
                <section className='ml-[10%] mb-[20%]'>
                    <div className="font-['Inter'] font-medium text-2xl mt-24">
                        {/** DetailTopbar **/}
                        <ul className="flex w-[90%] bg-[#475569] bg-opacity-10 p-1 rounded-md">
                            <li className="rounded-md font-bold pl-10 pr-[40%] p-2">
                                Detalhes
                            </li>
                            <li className="rounded-md font-bold pr-10 p-2 flex">
                                <p className='pr-20'>|</p>   Localização e Contacto
                            </li>
                        </ul>
                        {/** DetailBottom **/}
                        <div className='flex gap-[35%]'>
                            <div className='mt-16 ml-[2.5%]'>
                                <h3 className='font-medium text-2xl'>
                                    Preço médio
                                </h3>
                                <p className='font-normal text-lg mt-4'>
                                    {restaurantData.price}
                                </p>
                                <br />
                                <h3 className='font-medium text-2xl'>
                                    Gastronomia
                                </h3>
                                <p className='font-normal text-lg mt-4'>
                                    {restaurantData.food}
                                </p>
                            </div>
                            <div className='mt-16 w-fit'>
                                <ul className=''>
                                    <li className='font-normal text-xl flex'>
                                        <Icon path={mdiLaptop} size={1.3} className='mr-4' />
                                        <div className='hover:text-red-500 transition duration-200 cursor-pointer'>
                                            {restaurantData.site}
                                        </div>
                                    </li>
                                    <li className='font-normal text-xl mt-8 flex'>
                                        <Icon path={mdiPhone} size={1.3} className='mr-4'/>
                                        <div className='hover:text-red-500 transition duration-200 cursor-pointer'>
                                            {restaurantData.tel}
                                        </div>
                                    </li>
                                    <li className='font-normal text-xl mt-8 flex'>
                                        <Icon path={mdiEmailOutline} size={1.3} className='mr-4' />
                                        <div className='hover:text-red-500 transition duration-200 cursor-pointer'>
                                            {restaurantData.email}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/** Ratings **/}
                        <div className='mt-[20%] flex'>
                            <h1 className='ml-[2.5%] text-2xl rounded-md font-bold'>
                                Avaliações
                            </h1>
                            <div className='ml-[69%]'>
                              <button 
                                onClick={handleWriteReview}
                                className="p-3 text-center bg-black rounded font-['Inter'] font-bold text-sm text-white cursor-pointer transition duration-500 hover:bg-green-500">
                                  Escreva uma avaliação
                              </button>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <section id="commentsReviews">
                                <div className='p-10'>
                                    {renderReviews()}
                                </div>
                        </section>
                    </div>
                </section>
                <Footbar/>
        </>
    )
}

export default ResPage