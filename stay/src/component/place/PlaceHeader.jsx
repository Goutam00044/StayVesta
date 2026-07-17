export default function PlaceHeader({ place }) {
    return (
        <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    {place.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-4 mb-4 text-sm text-gray-700">
                    <a
                        href={`https://maps.google.com/?q=${place.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-amber-600 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                        </svg>
                        {place.address}
                    </a>
                </div>
            </div>

            {/* Right future Added  */}

            {/* <div className="flex gap-3">
                <button
                    className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition"
                >
                    Share
                </button>
                <button
                    className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition"
                >
                    Save
                </button>
            </div> */}
        </section>
    );
}