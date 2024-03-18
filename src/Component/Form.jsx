import React, { useState, useEffect,useRef } from "react";

function Form() {
    const [file, setFile] = useState(null);
    const [frames , setFrames]=useState([])
    const videoRef = useRef(null);
    const capturedFrames = [];

    async function handleImage(e) {
        e.preventDefault();
        setFile(document.getElementById('file_name').files[0]);
        const video = document.createElement('video');
        video.src = URL.createObjectURL(document.getElementById('file_name').files[0]);
        video.onloadedmetadata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            
            const capturedFrames = [];
    
            const interval = setInterval(() => {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                capturedFrames.push(canvas.toDataURL('image/jpeg'));
    
                if (video.currentTime < video.duration) {
                    video.currentTime += 1; // Adjust the interval between frames here (in seconds)
                } else {
                    clearInterval(interval);
                    setFrames(capturedFrames);
                    console.log(frames);
                }
            }, 1000); // Adjust the interval here (in milliseconds)
    
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
                {frames.map((item)=><img src={item}></img>)}
               
            </div>
        </div>
    );
}

export default Form;
// import React, { useRef, useState } from 'react';

// function VideoUploader() {
//   const videoRef = useRef(null);
//   const [frames, setFrames] = useState([]);

//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     videoRef.current.src = URL.createObjectURL(file);
//   };

//   const extractFrames = () => {
//     const video = videoRef.current;
//     const capturedFrames = [];

//     const captureFrame = (currentTime) => {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(video, 0, 0,300,300 ,canvas.width, canvas.height);
//       capturedFrames.push(canvas.toDataURL('image/jpeg'));
      
//       if (currentTime < video.duration) {
//         video.currentTime += 1; // Adjust the interval between frames here (in seconds)
//         video.play();
//       } else {
//         setFrames(capturedFrames);
//         console.log(frames)
//       }
//     };

//     video.onloadedmetadata = () => {
//       captureFrame(0);
//     };
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={handleUpload} />
//       <video ref={videoRef} controls />
//       <button onClick={extractFrames}>Extract Frames</button>
//       {frames.map((frame, index) => (
//         <img key={index} src={frame} alt={`Frame ${index}`} />
//       ))}
//     </div>
//   );
// }

// export default VideoUploader;