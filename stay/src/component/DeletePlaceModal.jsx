export default function DeletePlaceModal({
    place,
    onClose,
    onConfirm,
}) {
    return (
        <div className="fixed z-10 bg-black/5 min-h-screen w-screen flex justify-center items-center top-0 left-0">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

                <h2 className="text-xl font-semibold text-red-600">
                    Delete Listing
                </h2>

                <p className="mt-3 text-gray-600">
                    Are you sure you want to permanently delete
                    <span className="font-semibold">
                        {" "}
                        {place.title}
                    </span>
                    ?
                </p>

                <p className="text-sm text-red-500 mt-2">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl border"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
}