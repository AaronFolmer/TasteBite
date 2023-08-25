import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import Icon from '@mdi/react'
import { mdiMagnify, mdiHeartOutline } from '@mdi/js'

// firebase

import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase'

const storage = getStorage();
const storageRef = ref(storage, 'restaurants');

function FormSearch() {

    const [search, setSearch] = useState('')
    const [images, setImages] = useState([])
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {

        // funcao para buscar os dados da firebase
        const fetchRestaurantData = async () => {
          const restaurantsCollection = collection(firestore, 'restaurants')
          const q = query(restaurantsCollection)
  
          try {
            const querySnapshot = await getDocs(q)
            const imageData = []
  
            querySnapshot.forEach(async(doc) => {
              const data = doc.data()
              const imageObj = {
                src: '',
                title: data.title,
                price: data.price,
                loc: data.loc,
                id: doc.id,
                likes: data.likes,
              }
  
              // Get image URL
              getDownloadURL(ref(storageRef, `${doc.id}.jpg`))
                .then((url) => {
                  imageObj.src = url;
                  imageData.push(imageObj)
                  setImages([...imageData])
                })
                .catch((error) => {
                  console.log("erro ao obter a url", error)
                })
  
            })
          } catch (error) {
              console.log("erro ao buscar os dados na firebase", error)
          }
        }
  
        fetchRestaurantData()
      }, [])


      const handleSearch = (e) => {
        const inputValue = e.target.value;
        setSearch(inputValue);
    
        if (inputValue.trim() === '') {
          setSearchResults([]) // Limpa os resultados de busca se a entrada de busca estiver vazia
          return
        }
    
        const results = images.filter((image) =>
          image.title.toLowerCase().includes(inputValue.toLowerCase())
        )
        setSearchResults(results)
      }


    return(
        <>
            <form role="search" className="mt-10" /*onSubmit={handleSearch}*/>
                <button className="absolute m-3.5 rotate-90" type='submit'>
                    <Icon path={mdiMagnify} size={1} />
                </button>
                <input 
                    placeholder="A proucura de um lugar?"
                    type="text" 
                    size="100"
                    value={search}
                    onChange={handleSearch}  
                    className="h-12 pl-12 rounded-full border-none font-serif text-xl placeholder-[#475569] p-5 focus:rounded-md" 
                />
            </form>
            
            {/* Renderizar os resultados da busca apenas se houver um valor de busca */}
            {
                searchResults.length > 0 && (
                    searchResults.map((image) => (
                        <div 
                            key={image.id} 
                            className='bg-white mx-[25%] w-[50%] h-[10%] rounded-xl m-4 p-10 flex gap-10'
                        >     
                            <img src={image.src} alt={image.title} className='w-[20%] h-[100px] object-cover rounded-xl' />
                            <div className='block'>
                                <Link to={`/restaurant/${image.id}`} >
                                    <h3 className="font-['Inter'] font-bold text-xl hover:underline hover:text-red-500">{image.title}</h3>
                                </Link>
                                <p className="font-['Inter'] font-bold text-xl opacity-60">{image.loc}</p>
                                <div className='flex'>
                                    <Icon path={mdiHeartOutline} size={1} className='mt-2' />
                                    <p className="text-xl font-semibold mt-[2%] ml-[5%] mr-[3.5%]">{image.likes}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </>
    )
}

export default FormSearch