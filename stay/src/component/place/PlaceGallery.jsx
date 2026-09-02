export default function PlaceGallery({
    place,
    setshowallphotos,
}) {
    const photos = place?.photos || [];

    return (
        <section className="relative">

            {photos.length > 0 ? (

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
                    <div
                        className="
                            lg:col-span-2
                            lg:row-span-2
                            min-h-0
                            overflow-hidden
                        "
                    >
                        <img
                            onClick={() => setshowallphotos(true)}
                            src={
                                    photos[0]?.startsWith("http")
                                        ? photos[0]
                                        : `http://localhost:4000/uploads/${photos[0]}`
                                }
                            className="
                                block
                                w-full
                                h-full
                                min-h-[300px]
                                object-cover
                                cursor-pointer
                                hover:scale-[1.02]
                                
                                transition
                                duration-500
                            "
                            alt={place.title}
                        />
                    </div>


                    {/* Right Images */}
                    {[1, 2, 3, 4].map((index) => {

                        // Don't create an empty box
                        if (!photos[index]) {
                            return null;
                        }

                        return (
                            <div
                                key={index}
                                className="
                                    hidden
                                    lg:block
                                    min-h-0
                                    overflow-hidden
                                "
                            >
                                <img
                                    onClick={() =>
                                        setshowallphotos(true)
                                    }
                                    src={
                                        photos[index]?.startsWith("http")
                                            ? photos[index]
                                            : `http://localhost:4000/uploads/${photos[index]}`
                                    }
                                    className="
                                        block
                                        w-full
                                        h-full
                                        object-cover
                                        cursor-pointer
                                        hover:scale-[1.01]
                                        
                                        transition
                                        duration-500
                                    "
                                    alt={`${place.title} ${index + 1}`}
                                />
                            </div>
                        );
                    })}

                </div>

            ) : (

                /* No Photos */
                <div
                    className="
                        h-[300px]
                        lg:h-[460px]
                        rounded-3xl
                        bg-gray-100
                        border
                        border-gray-200
                        flex
                        items-center
                        justify-center
                        text-gray-500
                    "
                >
                    No photos available
                </div>

            )}


            {/* Show All Photos */}
            {photos.length > 0 && (
                <button
                    onClick={() => setshowallphotos(true)}
                    aria-label="Show all photos"
                    className="
                        absolute
                        bottom-4
                        right-4
                        bg-white
                        border
                        border-gray-200
                        shadow-lg
                        rounded-xl
                        p-3
                        sm:px-5
                        sm:py-3
                        font-medium
                        hover:shadow-xl
                        hover:bg-gray-50
                        transition
                        flex
                        items-center
                        gap-2
                    "
                >
                    {/* Gallery Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
                        />
                    </svg>

                    {/* Desktop text */}
                    <span className="hidden sm:inline">
                        Show all photos
                    </span>
                </button>
            )}

        </section>
    );
}