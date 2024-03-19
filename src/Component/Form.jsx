import React, { useState, useEffect,useRef } from "react";

function Form() {
    const [file, setFile] = useState(null);
    const [frames , setFrames]=useState([])
    const videoRef = useRef(null);
    const capturedFrames = [];

    async function handleImage(e) {
        e.preventDefault();
        setFile(document.getElementById('file_name').files[0]);
        const video=document.createElement('video')
        video.src = URL.createObjectURL(document.getElementById('file_name').files[0]);
        video.onloadedmetadata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            
            const capturedFrames = [];
    
            video.addEventListener('timeupdate', function() {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                capturedFrames.push(canvas.toDataURL('image/jpeg'));
            });
            
            video.addEventListener('ended', function() {
                setFrames(capturedFrames);
                console.log(frames);
            });
    
            video.play();
        };
    }
           
           
          
       
    

    // useEffect(() => {
    //     if (file) {
    //         console.log(file.name);
    //     }
    // }, [file]);

    return (
        <div className="relative w-full h-full bg-purple-300">
            <div className="w-1/2 h-1/2 bg-slate-400 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] border-2 border-red-500">
                <form>
                    <label>Upload video</label>
                    <br />
                    <input type="file" id="file_name"></input>\
                    <br></br>
                    <button className="mx-20 my-10" onClick={handleImage}>Submit</button>
                </form>
                {file && <video  autoPlay muted loop className="w-[400px] h-[400px] mx-20 my-10" src={URL.createObjectURL(file)} alt="Uploaded" />}
               <div  className="grid grid-cols-4 gap-14">
                {frames.map((item ,index)=><img key={index} src={item}></img>)}
                </div>
               
            </div>
        </div>
    );
}

export default Form;
