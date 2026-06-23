import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({addedPhotos,onchange}){
    const [photoLink,setPhotoLink] = useState('');
    
    function uploadfile(ev){
        // for file inputs the FileList is on ev.target.files
        const files = ev.target.files;
        const data = new FormData();
        for(let i=0;i<files.length;i++)
        {
            data.append('photos',files[i])
        }
        axios.post('/upload', data, {
            headers: {'Content-Type':'multipart/form-data'}
        }).then(
            response =>{
                const {data:filenames} = response;
                onchange(prev => {
                return [...prev, ...filenames];
                });
            }
        )
    }
    async function addPhotoByLink(ev){
        ev.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/upload-link', { link: photoLink });
            const filename = response.data?.savedPath || response.data;
            if (!filename) {
                return;
            }
            onchange(prev => [...prev, filename]);
            setPhotoLink('');
        } catch (error) {
            console.error('Upload failed', error);
        }
    }
    return(
        <>
            <div className="flex gap-2">
            <input type="text" 
                placeholder={'Add using a link .... jpg' } 
                value={photoLink} 
                onChange={ (e)=>{
                    setPhotoLink(e.target.value);
                }}/>
            <button type="button" 
                onClick={addPhotoByLink} 
                className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp; 
            </button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">    
                {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                <div className="h-32 flex" key={index}>
                    <img className="rounded-2xl w-full object-cover" src={"http://localhost:4000/uploads/"+link} alt="" />
                </div>
            ))}
            <label className="h-32 flex cursor-pointer items-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <input type="file" 
                    multiple 
                    className="hidden" onChange={uploadfile} 
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                Upload    
            </label>
            </div>
        </>
    )
}