import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../component/place/BookingWidget";
import PlaceHeader from "../component/place/PlaceHeader.jsx";
import PlaceGallery from "../component/place/PlaceGallery.jsx";
import PlaceOverview from "../component/place/PlaceOverview.jsx";

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
            <div className="absolute inset-0 bg-gray-200 min-h-screen "> 
                    <div className="flex items-center p-3 gap-4 fixed bg-white h-18 w-full">
                        <button onClick={()=>{setshowallphotos(false)}} className="flex font-bold text-lg items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>                        

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
           
            
            <div className="grid lg:grid-cols-[1.8fr_420px] gap-12 mt-14 items-start">
                {/* Page Content*/}
                    <PlaceOverview place={place}/>
                    <div className="lg:sticky lg:top-28">
                        <BookingWidget place={place}/>
                    </div>
            </div>
        </div> 
                     
    </div>
    )
}