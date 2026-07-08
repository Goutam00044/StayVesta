import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../component/AccountNav";
export default function ProfilePage(){
const {ready, user, setUser} = useContext(UserContext); 
    let {subpage} = useParams();
    if (!subpage) {
        subpage = 'profile';
    }  
    console.log(user);
    if(!ready){
                return 'Loading..';
        }

        return(
            <>
        <div className="w-full px-6 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                    {/* Left Sidebar */}
                    <div>
                    <AccountNav/>
                    </div>
                {/* right content */}
                <div>
                {subpage === 'profile' && !!user && (
                    <div>
                        <div className="bg-white border border-gray-200 rounded-2xl px-8 py-7 flex items-center gap-6 mb-6">
                            <div className="w-19 h-19 rounded-full bg-amber-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="text-xl font-bold text-gray-900 mb-0.5">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            {user.createdAt && (
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">Member since</p>
                                    <p className="text-sm font-semibold text-gray-700 mt-0.5">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl px-8 py-6">
                            <p className="text-[15.5px] font-bold text-gray-900 mb-4">Personal information</p>

                            <div className="flex items-center justify-between py-3.5 border-b border-gray-100">
                                <span className="text-sm text-gray-400">Full name</span>
                                <span className="text-sm font-medium text-gray-900">{user.name}</span>
                            </div>
                            <div className="flex items-center justify-between py-3.5 border-b border-gray-100">
                                <span className="text-sm text-gray-400">Email address</span>
                                <span className="text-sm font-medium text-gray-900">{user.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-3.5">
                                <span className="text-sm text-gray-400">Account status</span>
                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Verified</span>
                            </div>
                        </div>
                    </div>
                )}

                {subpage === 'places' && (
                    <PlacesPage/>
                )}
                </div>
             </div>
            </div>
        </div>
        </>
        )
}