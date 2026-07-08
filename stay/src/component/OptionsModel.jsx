import { Link } from "react-router-dom";

export default function OptionsModel({place, onClose})
{
    return(
        <>
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
            
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Manage Listing</p>
            </div>
 
            {/* Primary Actions */}
            <div className="py-1">
                <Link
                    to={`/places/${place._id}`}
                    className="flex items-center gap-3 px-4 py-3 transition group"
                    onClick={onClose}
                >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-lg group-hover:bg-blue-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-gray-900">View Listing</p>
                        <p className="text-xs text-gray-500">
                            See how guests view it
                        </p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                
                <Link
                    to={`/account/places/${place._id}`}
                    className="flex items-center gap-3 px-4 py-3 transition group"
                    onClick={onClose}
                >
                    <div className="w-10 h-10 rounded-lg bg-green-100  flex items-center justify-center group-hover:bg-green-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-gray-900">Edit Listing</p>
                        <p className="text-xs text-gray-500">
                            Update details
                        </p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
 
                
            </div>
 
            {/* Divider */}
            <div className="border-t border-gray-100"></div>
 
            {/* Secondary Actions */}
            <div className="py-1">
                <button
                    className="w-full flex items-center gap-3 px-4 py-3transition group text-left"
                >
                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-lg group-hover:bg-amber-200 transition">
                        📦
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-gray-900">Unlist Property</p>
                        <p className="text-xs text-gray-500">
                            Hide from guests
                        </p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
 
            {/* Divider */}
            <div className="border-t border-gray-100"></div>
 
            {/* Danger Action */}
            <div className="py-1">
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 transition group text-left"
                >
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-lg group-hover:bg-red-200 transition">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 30 30">
                    <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
                    </svg>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-red-600">Delete Listing</p>
                        <p className="text-xs text-red-500">
                            Permanently remove
                        </p>
                    </div>
                    <svg className="w-4 h-4 text-red-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
        </>
    )
}