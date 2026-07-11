export default function ConfirmAction({ place, onCancel, onConfirm }) {
    const isListed = place.isListed;

    return (
        <div className="fixed inset-0 bg-black/5 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-900">
                    {isListed ? "Unlist Property?" : "List Property?"}
                </h2>

                {/* Description */}
                <p className="text-gray-500 mt-3 leading-relaxed">
                    {isListed
                        ? "This property will no longer be visible to guests and cannot receive new bookings until you list it again."
                        : "This property will become visible to guests and can start receiving bookings."}
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 font-medium"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                            isListed
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-amber-600 hover:bg-amber-700"
                        }`}
                    >
                        {isListed ? "Unlist" : "List"}
                    </button>
                </div>
            </div>
        </div>
    );
}