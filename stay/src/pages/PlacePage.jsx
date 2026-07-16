import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../component/place/BookingWidget";
import PlaceHeader from "../component/place/PlaceHeader.jsx";
import PlaceGallery from "../component/place/PlaceGallery.jsx";

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
                    <div className="max-w-6xl mx-auto grid gap-3 p-10">
                        {place?.photos?.length > 0 && place.photos.map((photo)=>(
                        <div className="">
                            <img
                                src={"http://localhost:4000/uploads/"+photo}
                                className="rounded w-full transition duration-300"
                                alt=""
                            />
                        </div>
                        ))}
                    </div>
            </div>
        )
    }

    return(
        <div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
           <div className="px-4">
             <PlaceHeader place={place} />
            </div>
           <PlaceGallery
                place={place}
                setshowallphotos={setshowallphotos}
            />
           
            
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