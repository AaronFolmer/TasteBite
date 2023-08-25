import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


// layouts

import Footbar from '../../layouts/Foot/Footbar'

// components

import Return from '../../components/Return'

// firebase

import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, collection }  from 'firebase/firestore';
import { firestore } from '../../utils/firebase' 

const storage = getStorage();
const storageRef = ref(storage, 'restaurants');


function UserReview() {

    const { id } = useParams();
    const auth = getAuth();
    const navigate = useNavigate();

    const [restaurantData, setRestaurantData] = useState(null)
    const [imageUrl, setImageUrl] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');

    const [userAvatarURL, setUserAvatarURL] = useState('');



    useEffect(() => {

      const fetchUserAvatarURL = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const userId = user.uid;
            const storageRef = ref(storage, `avatars/${userId}.jpg`);
            const downloadURL = await getDownloadURL(storageRef);
            setUserAvatarURL(downloadURL);
          }
        } catch (error) {
          console.error('Erro ao obter a URL da imagem do usuário', error);
        }
      };
  
      fetchUserAvatarURL();
  }, [auth, storage]); 

  // restaurant fectchs

    useEffect(() => {

      // Restaurant Data Fetch

        const fetchRestaurantData = async () => {
          try {
            const restaurantRef = doc(firestore, 'restaurants', id);
            const docSnapshot = await getDoc(restaurantRef);
    
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              setRestaurantData(data);
            } else {
              console.log('Documento não encontrado');
            }
          } catch (error) {
            console.log('Erro ao buscar', error);
          }
        };
    
        fetchRestaurantData();
    }, [id]);
    
    useEffect(() => {

      // Image Restaurant Fetch

      const fetchRestaurantImage = async () => {
        try {
          const imageRef = ref(storageRef, `${id}.jpg`);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } catch (error) {
          console.log('Erro ao buscar imagem do Firebase Storage:', error);
        }
      };
    
      fetchRestaurantImage();
    }, [id]);  


    // handlesubmit
    
    // ...

    // Altere a função handleReviewSubmit:
    const handleReviewSubmit = async (event) => {
      event.preventDefault();

      // Verificar se todos os campos foram preenchidos
      if (reviewText.trim() === '' || reviewTitle.trim() === '') {
        console.log('Preencha todos os campos');
        return;
      }

      // Salvar a avaliação no Firebase
      try {
        const user = auth.currentUser;
        if (user) {
          const reviewData = {
            title: reviewTitle,
            text: reviewText,
            restaurantId: id,
            userId: user.uid,
            userName: user.displayName,
            userAvatarURL: userAvatarURL,
          };

          const reviewsCollectionRef = collection(firestore, 'reviews');
          await setDoc(doc(reviewsCollectionRef), reviewData);
          console.log('Avaliação salva com sucesso');

          // Redirecionar para a página que mostra a avaliação
          navigate('/');
        } else {
          console.log('Usuário não autenticado');
        }
      } catch (error) {
        console.log('Erro ao salvar a avaliação', error);
      }
    };

    if (!userAvatarURL) {
      return null;
    }

// ...


    return(
        <>
        <Return/>
            <section className='flex ml-[10%] mb-[20%]'>
                {/** Left Side **/}
                <div>
                    <h1 className="font-['Inter'] text-5xl font-bold">
                        Diga-nos: como foi <br></br> a sua visita?
                    </h1>
                    <br />
                    <br />
                    <div id="card" className="border-2 border-slate-200 h-auto w-[60%] p-4 rounded-sm">
                        {imageUrl ? (
                            <img src={imageUrl} alt={restaurantData?.title} className='w-[600px] h-[350px] object-cover rounded-sm' />
                        ) : (
                            <p>Loading image...</p>
                        )}
                        <br />
                        <h1 className="font-['Inter'] font-bold text-xl">{restaurantData?.title}</h1>
                        <h2 className="font-['Inter']">{restaurantData?.loc}</h2>
                    </div>
                </div>

                <div className='mr-[5%] ml-[2%] border'/>

                {/** Right Side **/}
                <div>
                    <form onSubmit={handleReviewSubmit}>
                        {/** Rating **/}
                        <div className='' id="rating">
                            <h2 className="font-['Inter'] text-4xl font-semibold">Como classificaria a sua experiência?</h2>
                        </div>

                        {/** Review **/}
                        <div className='mt-[10%]'>
                            <h2 className="font-['Inter'] text-2xl font-semibold">Escreva a sua avaliação</h2>
                            <br />
                            <textarea
                                minLength={100} 
                                rows={4}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder='Este lugar é excelente para uma saída à noite casual...'
                                className="w-[120%] rounded-lg border-2 border-black border-opacity-10 font-['Inter'] text-base placeholder-[#475569] p-3 focus:rounded-md"
                            >
                            </textarea>
                        </div>

                        {/** Review Title **/}
                        <div className='mt-[20%]'>
                            <h2 className="font-['Inter'] text-2xl font-semibold">Dê um título à sua avaliação</h2>
                            <br />
                            <textarea 
                                minLength={50} 
                                rows={1}
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                                placeholder='Conte-nos os pontos principais da sua experiência'
                                className="w-[120%] rounded-lg border-2 border-black border-opacity-10 font-['Inter'] text-base placeholder-[#475569] p-3 focus:rounded-md"
                            >
                            </textarea>
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="p-3 w-[120%] bg-black font-['Inter'] font-bold rounded text-white cursor-pointer transition duration-500 hover:bg-green-500"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </section>

            <Footbar/>
        </>
    )
}

export default UserReview
