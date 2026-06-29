// ConfirmBookingModal.jsx
// Save in your components folder and use it like this in BookingWidget.jsx:
//
// import ConfirmBookingModal from "./ConfirmBookingModal";
//
// Replace your old if(model) block with:
// {model && (
//   <ConfirmBookingModal
//     checkIn={checkIn}
//     checkOut={checkOut}
//     onClose={() => setmodel(false)}
//     onConfirm={(finalIn, finalOut) => {
//       setcheckIn(finalIn);
//       setcheckOut(finalOut);
//       setmodel(false);
//       book(finalIn, finalOut);
//     }}
//   />
// )}

import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";

export default function ConfirmBookingModal({ checkIn, checkOut, onClose, onConfirm }) {
  const [localIn,  setLocalIn]  = useState(checkIn);
  const [localOut, setLocalOut] = useState(checkOut);

  let nights = 0;
  if (localIn && localOut) {
    nights = differenceInCalendarDays(new Date(localOut), new Date(localIn));
  }

  function handleConfirm() {
    if (!localIn || !localOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (nights <= 0) {
      alert("Check-out must be after check-in.");
      return;
    }
    onConfirm(localIn, localOut);
  }

  return (
    <div className="fixed z-10 bg-black/50 min-h-screen w-screen flex justify-center items-center top-0 left-0">
      <div className="bg-white rounded-2xl shadow-xl p-6 relative w-full max-w-sm mx-4">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h1 className="text-lg font-semibold text-gray-800 mb-1">Confirm Booking</h1>
        <p className="text-sm text-gray-500 mb-5">Review or update your dates before confirming.</p>

        {/* Date inputs */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Check-in</label>
            <input
              type="date"
              value={localIn}
              onChange={e => setLocalIn(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Check-out</label>
            <input
              type="date"
              value={localOut}
              onChange={e => setLocalOut(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Nights summary */}
        {nights > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-5 flex justify-between items-center">
            <span className="text-sm text-gray-600">Duration</span>
            <span className="text-sm font-semibold text-amber-700">
              {nights} night{nights !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-2 bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-500 flex-1"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}