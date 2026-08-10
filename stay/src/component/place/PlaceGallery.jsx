const BASE_URL = "http://localhost:4000/uploads/";

export default function PlaceGallery({
    place,
    setshowallphotos,
}) {
    return (
        <section className="relative mt-8">

            <div
                className="
                    grid
                    grid-cols-1
                    lg:grid-cols-4
                    lg:grid-rows-2
                    gap-2
                    h-auto
                    lg:h-[460px]
                    rounded-3xl
                    overflow-hidden
                "
            >

                {/* Main Image */}
                <div className="lg:col-span-2 lg:row-span-2 min-h-0 overflow-hidden">
                    {place.photos?.[0] && (
                        <img
                            onClick={() => setshowallphotos(true)}
                            src={BASE_URL + place.photos[0]}
                            className="
                                block
                                w-full
                                h-full
                                object-cover
                                cursor-pointer
                                hover:scale-[1.02]
                                hover:brightness-95
                                transition
                                duration-500
                            "
                            alt=""
                        />
                    )}
                </div>

                {/* Right Images */}
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className="
                            hidden
                            lg:block
                            min-h-0
                            overflow-hidden
                        "
                    >
                        {place.photos?.[index] && (
                            <img
                                onClick={() => setshowallphotos(true)}
                                src={BASE_URL + place.photos[index]}
                                className="
                                    block
                                    w-full
                                    h-full
                                    object-cover
                                    cursor-pointer
                                    hover:scale-[1.02]
                                    transition
                                    duration-500
                                "
                                alt=""
                            />
                        )}
                    </div>
                ))}

            </div>

            <button
                onClick={() => setshowallphotos(true)}
                className="
                    absolute
                    bottom-5
                    right-5
                    bg-white
                    border
                    shadow-lg
                    rounded-xl
                    px-5
                    py-3
                    font-medium
                    hover:shadow-xl
                    transition
                "
            >
                Show all photos
            </button>

        </section>
    );
}