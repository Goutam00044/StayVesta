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
    const [showallphotos, setshowallphotos] = useState(false);
    const [error, setError] = useState(false);
    const {id} = useParams();
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/' + id)
            .then((response) => {
                setplace(response.data);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
            });
            }
    ,[id])

    // If there's an error fetching the place data, we can show an error message to the user. This could happen if the place doesn't exist or if there's a network issue.
    if (error) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="text-center max-w-md">

                <h2 className="text-2xl font-semibold text-gray-900">
                    Place not found
                </h2>

                <p className="mt-3 text-gray-500">
                    We couldn't load this place. It may have been removed
                    or is currently unavailable.
                </p>

                <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-5 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                >
                    Go Back
                </button>

            </div>
        </div>
    );
}

// While the place data is being fetched, we can show a loading indicator to the user. Once the data is fetched, we can display the place details. If the user wants to see all photos, we can show a full-screen photo gallery.
   if (!place) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin mx-auto"></div>

                <p className="mt-4 text-gray-500">
                    Loading place...
                </p>
            </div>
        </div>
    );
   }

    if(showallphotos)
    {
        return (
            <div className="absolute inset-0  min-h-screen "> 
                    <div className="
                                fixed
                                top-0
                                left-0
                                right-0
                                z-50
                                flex
                                items-center
                                gap-4
                                px-4
                                py-3
                                bg-white
                                border-b
                                border-gray-200
                            ">
                                <button
                                    onClick={() => setshowallphotos(false)}
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        w-10
                                        h-10
                                        rounded-full
                                        hover:bg-gray-100
                                        transition
                                    "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 19.5 8.25 12l7.5-7.5"
                                        />
                                    </svg>
                                </button>

                                <h2 className="
                                    text-lg
                                    sm:text-xl
                                    font-semibold
                                    truncate
                                ">
                                    Photos of {place.title}
                                </h2>
                            </div>
                    <div className="
                                    max-w-6xl
                                    mx-auto
                                    px-4    
                                    sm:px-6
                                    lg:px-8
                                    pt-24
                                    pb-10
                                    grid
                                    gap-4
                                ">
                        {place?.photos?.length > 0 &&
                                place.photos.map((photo, index) => (
                                    <div key={photo + index}>
                                        <img
                                            
                                            src={
                                                photo.startsWith("http")
                                                    ? photo
                                                    : `http://localhost:4000/uploads/${photo}`
                                            }
                                            className="
                                                rounded 
                                                w-full 
                                                h-auto
                                                object-cover
                                                transition
                                                duration-500
                                                
                                            "
                                            alt={`${place.title} ${index + 1}`}
                                        />
                                    </div>
                                ))
                            }
                    </div>
            </div>
        )
    }

    return(
        <div>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 sm:py-4 lg:py-4">           
            <PlaceHeader place={place} />

            <PlaceGallery
                    place={place}
                    setshowallphotos={setshowallphotos}
                />
           
            {/* Content + Booking Widget */}
                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-[minmax(0,1.8fr)_420px]
                    gap-10
                    lg:gap-12
                    mt-10
                    lg:mt-14
                    items-start
                ">
                    <PlaceOverview place={place} />

                    <div className="lg:sticky lg:top-28">
                        <BookingWidget place={place} />
                    </div>
                </div>
        </div> 
                     
    </div>
    )
}