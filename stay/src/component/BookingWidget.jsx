export default function BookingWidget({place})
{
    return(
            <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center">
                        Price: ${place.price} / per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4">
                                <label> Check In : </label>
                                <input type="date" />
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label> Check Out : </label>
                                <input type="date" />
                            </div>  
                            </div>
                            <div className="py-3 px-4 border-t">
                                <label> Number Of Guests : </label>
                                <input type="number" value={1}/>
                        </div>
                    </div>
                <button className="bg-amber-600 text-white mt-2 w-full px-3 py-2 rounded-l-2xl rounded-r-2xl">Book now</button>
            </div>
    );
}