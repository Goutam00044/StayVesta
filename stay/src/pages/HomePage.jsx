import Header from '../component/Header';
import Layout from '../component/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Homepage()
{   
    const [places, setplaces] = useState([]);
    useEffect(()=>{
        axios.get('/places').then(response=>{
            setplaces(response.data);
            console.log(response);
            console.log(places)
        })
    },[])
    return(
        <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8'>
            {places.length > 0 && places.map(place => (
                <div>
                    <div className="flex mb-2 rounded-2xl bg-gray-500">
                        {place.photos?.[0] && (
                                <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" />
                        )}
                    </div>
                    <div>
                        <h2 className='px-0.5 font-bold'>{place.address}</h2>
                        <h3 className='px-0.5 text-sm text-gray-500'>{place.title}</h3>
                        <div className=''>
                            <span className='font-bold'>${place.price}</span> per nigth
                            </div>
                    </div>
                </div>
            ))}
        </div>       
    )
}