import { differenceInCalendarDays } from "date-fns";
export default function CancelBookingModel({booking, onClose, onConfirm}){

    return(
    <div className="fixed z-10 bg-black/50 min-h-screen w-screen flex justify-center items-center top-0 left-0">
      <div className="bg-white rounded-2xl shadow-xl p-6 relative w-full max-w-sm mx-4">

        {/* Close button */}
        <button onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h1 className="text-lg font-semibold text-gray-800 mb-1">Cancel Booking</h1>
        <p className="text-sm text-gray-500 mb-4">Are you sure you want to cancel this booking?.</p>
        <div className="mb-3">
            <div className="divide-y divide-gray-100">
                <div className="flex justify-between py-1.5">
                  <span>Property</span>
                  <span>{booking.place.title}</span>
                </div>
            </div>
            <div className="divide-y divide-gray-100">
                <div className="flex justify-between py-1.5">
                    <span>Amount</span>
                    <span>₹{booking.price}</span>
                </div>
            </div>
              <div className="divide-y divide-gray-100">
                <div className="flex justify-between py-1.5">
                    <span>Total Nights</span>
                    <span>
                        {differenceInCalendarDays(
                            new Date(booking.checkOut),
                            new Date(booking.checkIn)
                        )}
                    </span>
                </div>
            </div>
        </div>
    
        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-400 text-gray-600 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-gray-100"
          >
            Keep Booking
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-amber-600 text-white px-4 py-3 rounded-2xl text-sm font-medium hover:bg-amber-500"
          >
            Cancel Booking
          </button>
        </div>

      </div>
    </div>
    );
}