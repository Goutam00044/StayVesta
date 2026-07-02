export default function RefundStatusModal({ booking, onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="p-6 border-b">

                    <h2 className="text-2xl font-semibold">
                        Refund Status
                    </h2>

                </div>
                <div className="mb-2 p-6 space-y-5">
                    <h3 className="text-sm font-semibold mb-5">
                        Refund Progress
                    </h3>
                    <div className="flex items-center justify-between">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-3 h-3 rounded-full bg-green-500 text-white flex items-center justify-center">
                            </div>
                            <p className="text-xs font-medium mt-2 text-center">
                                Refund Requested
                            </p>
                        </div>
                        <div className=" border border-amber-300 flex-1"></div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-3 h-3 rounded-full bg-yellow-400 text-white flex items-center justify-center">
                            </div>
                            <p className="text-xs font-medium mt-2 text-center">
                                Processing
                            </p>
                        </div>
                        <div className="border border-gray-300 flex-1"></div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-3 h-3 rounded-full bg-gray-300 text-white flex items-center justify-center">
                            </div>
                            <p className="text-xs font-medium mt-2 text-center">
                                Refunded
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 space-y-5 mb-4">

                    <div className="flex justify-between">
                        <span>Booking Amount</span>
                        <span className="font-semibold">
                            ₹{booking.price}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Refund Status</span>

                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                            Pending
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Payment Method</span>

                        <span>Razorpay</span>
                    </div>

                    <div className="flex justify-between">
                        <span>
                            Expected Time
                        </span>

                        <span>5–7 Business Days</span>
                    </div>

                </div>

                {/* Footer */}

                <div className="border-t p-4">

                    <button
                        onClick={onClose}
                        className="primary w-full"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}