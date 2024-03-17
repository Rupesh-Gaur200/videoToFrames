import React, { useState, useEffect } from "react";

function Form() {
    const [file, setFile] = useState(null);

    function handleImage(e) {
        e.preventDefault();
        // console.log("clicked");
        setFile(document.getElementById('file_name').files[0]);
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
                    <input type="file" id="file_name"></input>
                    <button onClick={handleImage}>Submit</button>
                </form>
                {file && <video autoPlay muted className="w-[400px] h-[400px] mx-20 my-20"src={URL.createObjectURL(file)} alt="Uploaded" />}
            </div>
        </div>
    );
}

export default Form;
