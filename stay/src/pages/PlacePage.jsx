import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../component/BookingWidget";

export default function PlacePage()
{
    const [place, setplace] = useState(null);
    const [showallphotos, setshowallphotos] = useState(false)
    const {id} = useParams();
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then((response)=>{
            setplace(response.data);
        })
    }
    ,[id])

    if(!place){
        return;
    }

    if(showallphotos)
    {
        return (
            <div className="absolute inset-0 bg-white min-h-full"> 
                    <div className="p-3 fixed bg-gray-100 w-full">
                        <button onClick={()=>{setshowallphotos(false)}} className="flex font-bold text-lg items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-16 px-8 p-4w-full">
                        <h2 className="text-2xl mr-36 font-bold">Photos of {place.title}</h2>
                    </div>
                    <div className="grid gap-2 p-8">
                        {place?.photos?.length > 0 && place.photos.map((photo)=>(
                        <div className="">
                            <img src={"http://localhost:4000/uploads/"+photo} alt="" />
                        </div>
                        ))}
                    </div>
            </div>
        )
    }

    return(
        <div>
        <div className="mt-4  bg-gray-200 -mx-8 pt-8 px-8">
           <div className="px-4">
             <h1 className="text-2xl" >{place.title}</h1>
             <a className="flex mt-1 my-2 gap-1 font-semibold underline" target="_blank" href={"https://maps.google.com//?q="+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
             {place.address}
             </a>
            </div>
           <div className="relative">
            <div className="grid  gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                <div>
                    <div>
                    {place.photos?.[0] && (
                        <img onClick={()=>{setshowallphotos(true)}} className='cursor-pointer aspect-square object-cover' src={"http://localhost:4000/uploads/"+place.photos[0]} alt="" />
                    )} 
                    </div>
                   
                </div>
                <div className="grid">
                        {place.photos?.[1] && (
                        <img onClick={()=>{setshowallphotos(true)}} className='cursor-pointer aspect-square object-cover' src={"http://localhost:4000/uploads/"+place.photos[1]} alt="" />
                         )}
                     <div className="overflow-hidden">
                        {place.photos?.[2] && (
                        <img onClick={()=>{setshowallphotos(true)}} className='cursor-pointer aspect-square object-cover relative top-2' src={"http://localhost:4000/uploads/"+place.photos[2]} alt="" />
                        )}
                     </div> 
                </div>
            </div>
            <button onClick={()=>setshowallphotos(true)} className="absolute bottom-2 right-2 flex gap-1 bg-amber-50 px-2 py-1 rounded-2xl" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Show Photos
            </button>
           </div>
           
            
            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                {/* Description  And check in and check out*/}
                <div>
                    <div className="my-4">
                     <h2 className="font-semibold text-2xl"> Description</h2>
                     <div>{place.description}</div>
                    </div>
                        Check-in: {place.checkIn} <br/>
                        Check-out: {place.checkOut} <br />
                        Max number of guests: {place.maxGuests}
                </div>
                    <div>   
                        <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 ">
                <div>
                <h2 className="font-semibold text-2xl">
                    Extra info
                </h2>
            </div>
                <div className="mt-1 mb-4 text-sm text-gray-700 leading-5">
                {place.extraInfo}
                </div>  
            </div>
        </div> 
                     
    </div>
    )
}