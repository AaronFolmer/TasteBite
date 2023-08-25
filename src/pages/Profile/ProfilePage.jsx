import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// components
import Return from '../../components/Return';

// layouts
import NavbarLayout from '../../layouts/Navbar/NavbarLayout';
import Footbar from '../../layouts/Foot/Footbar';
import ProfileNavSettings from '../../components/ProfileNavSettings';


// assets
import Avatar from '../../assets/avatar.jpg';

// firebase

import { firestore } from '../../utils/firebase' 
import { collection, query, where, getDocs, doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, updateProfile, updateEmail, updatePassword as updateAuthPassword } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ProfilePage() {

    // auth and storage
    const auth = getAuth();
    const storage = getStorage();

    
    //

    const [activePage, setActivePage] = useState('perfil');
    const [reviews, setReviews] = useState([]);


    const handlePageChange = (page) => {
        setActivePage(page);
    };

    //

    const [newPassword, setNewPassword] = useState('');
    const [showPasswordSavedMessage, setShowPasswordSavedMessage] = useState(false);
      
    //


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
        // ver o user atual ne
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setDisplayName(user.displayName);
            setEmail(user.email);
            getImageURL(user.uid);
        }
        });

        return () => {
        unsubscribe();
        };

    }, [auth]);


    useEffect(() => {
      const fetchUserReviews = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const reviewsCollection = collection(firestore, 'reviews');
            const q = query(reviewsCollection, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const userReviews = [];
  
            for (const docRef of querySnapshot.docs) {
              const reviewData = docRef.data();
              const restaurantId = reviewData.restaurantId;
              const restaurantDoc = doc(firestore, 'restaurants', restaurantId);
              const restaurantSnapshot = await getDoc(restaurantDoc);
              
              if (restaurantSnapshot.exists()) {
                const restaurantData = restaurantSnapshot.data();
                const imageUrl = await getDownloadURL(ref(storage, `restaurants/${restaurantId}.jpg`));
  
                const reviewWithRestaurant = {
                  ...reviewData,
                  restaurant: {
                    ...restaurantData,
                    imageUrl: imageUrl
                  }
                };
  
                userReviews.push(reviewWithRestaurant);
              }
            }
  
            setReviews(userReviews); // Define as avaliações específicas do usuário no estado
          }
        } catch (error) {
          console.log('Erro ao buscar as avaliações do usuário', error);
        }
      };
  
      fetchUserReviews();
    }, [auth]);

    // upload da imagem no banco de dados

    const uploadImage = async (file) => {
        try {

            // user
            const user = auth.currentUser;
            const userId = user.uid;

            const storageRef = ref(storage, `avatars/${userId}.jpg`);
            const metadata = {
                contentType: 'image/jpeg',
            };

            const uploadTask = uploadBytes(storageRef, file, metadata);
            const snapshot = await uploadTask;
            console.log('imagem foi enviada', snapshot);

            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('url de download:', downloadURL);
            setAvatarURL(downloadURL);

        } catch (error) {
            console.error('erro ao fazer upload da imagem', error);
        }
    };

    // pegar url da imagem

    const getImageURL = async (userId) => {
        try {

            const storageRef = ref(storage, `avatars/${userId}.jpg`);
            const downloadURL = await getDownloadURL(storageRef);
            
            console.log('url de download:', downloadURL);
            setAvatarURL(downloadURL);
        } catch (error) {
            console.error('erro ao obter a URL da imagem', error);
        }
    };

    // update o perfil

    const updateInfo = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;

        // atualizar o profile
        await updateProfile(user, {
        displayName: displayName,
        });

        // atualizar email
        await updateEmail(user, email);

        console.log('perfil atualizado');

        navigate('/');
    };

    // update password

    const updatePasswordHandler = async () => {
        try {
          const user = auth.currentUser;
          await updateAuthPassword(user, newPassword);
          console.log('Senha atualizada com sucesso');
          setNewPassword('');
    
          
          setShowPasswordSavedMessage(true);
          setTimeout(() => {
            setShowPasswordSavedMessage(false);
          }, 3000);
        } catch (error) {
          console.error('Erro ao atualizar a senha:', error);
        }
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        updatePasswordHandler();
      };
      
      

    return (
        <>
        <Return />
        <section className="m-auto mx-[30%] p-10 mb-[10%]">
            {showPasswordSavedMessage && (
                <h2 className="font-['Inter'] mb-[10%] text-xl text-center bg-green-200 border-2 border-green-500 rounded-lg p-3">
                Nova palavra-passe salva!
                </h2>
            )}
            <NavbarLayout />
            <ProfileNavSettings handlePageChange={handlePageChange} />
            {activePage === 'perfil' && (
            <div id="container-info">
                <div className="mb-20 mt-20 flex space-x-6">
                {/* avatar e nome */}
                <label htmlFor="files" className='cursor-pointer transition duration-500 hover:opacity-80'>
                    <img src={avatarURL || Avatar} alt="Avatar" className="w-36 h-36 rounded-full object-cover" />
                </label>
                <input
                    type="file"
                    id="files"
                    onChange={(e) => uploadImage(e.target.files[0])}
                    accept="image/jpeg"
                    className="hidden"
                />
                <div>
                    <p
                        htmlFor="files" 
                        className='px-10 rounded-lg  text-2xl font-medium'
                        >
                            Avatar
                    </p>
                    <p className='ml-10'>
                        Min 200x200px .PNG or .JPEG
                    </p>
                    </div>
                </div>
                <form className="flex flex-col gap-5" onSubmit={updateInfo}>
                    <label htmlFor="name" className="font-bold text-2xl">
                        Nome
                    </label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        size="30"
                        className="h-12 bg-slate-100 rounded-lg border-none font-serif text-xl p-5 focus:rounded-md"
                    />
                    <label htmlFor="email" className="font-bold text-2xl">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="30"
                        className="h-12 bg-slate-100 rounded-lg border-none font-serif text-xl p-5 focus:rounded-md"
                    />
                    <br />
                    <button
                        type="submit"
                        className="mx-[35%] p-3 w-[30%] bg-black font-['Inter'] font-bold rounded text-white cursor-pointer transition duration-500 hover:bg-green-500"
                    >
                        Salvar
                    </button>
                </form>
            </div>
            )}
            {activePage === 'password' && (
            <div id="container-info">
                <form className="flex flex-col gap-5 mt-20" onSubmit={handleSubmit}>
                    <label htmlFor="newPassword" className="font-bold text-2xl">
                        Nova senha
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-12 bg-slate-100 rounded-lg border-none font-serif text-xl p-5 focus:rounded-md"
                    />
                    <br />
                    <button
                        type="submit"
                        className="mx-[35%] p-3 w-[30%] bg-black font-['Inter'] font-bold rounded text-white cursor-pointer transition duration-500 hover:bg-green-500"
                    >
                        Atualizar senha
                    </button>
                </form>
            </div>
            )}
            {activePage === 'favoritos' && (
                <div id="container-info" style={{ height: '400px', overflow: 'auto' }}>
                {reviews.map((review) => (
                    <div key={review.id} className='flex p-10 border-[1px] mb-10 ml-16 mt-10 w-[80%]'>
                        <div className='ml-2'>
                            <img src={review.userAvatarURL || Avatar} alt="pfp" className='w-[70px] h-[70px] rounded-full object-cover text-sm' />
                            <p className="font-['Inter'] text-sm p-3">{review.userName}</p>
                        </div>
                        
                        <div className='block ml-10'>
                            {review.restaurant && (
                                <div className='flex mb-10'>
                                    {review.restaurant.imageUrl && <img className="w-[100px] h-[100px] rounded-sm object-cover" src={review.restaurant.imageUrl} alt={review.restaurant.title} />}
                                    <div className='ml-4'>
                                        <h4 className="font-['Inter'] font-bold text-lg">{review.restaurant.title}</h4>
                                        <p className="font-['Inter'] text-sm">{review.restaurant.loc}</p>
                                    </div>
                                </div>
                            )}
                            <h3 className="mt-4 font-['Inter'] font-bold text-xl">{review.title}</h3>
                            <p className="font-['Inter'] text-lg">{review.text}</p>
                        </div> 
                        
                    </div>
                    ))}
                </div>
                )}
            </section>
        <Footbar />
        </>
    );
}

export default ProfilePage