



function handleImage(e){
      e.preventDefault()
      console.log("clicked")
}




function Form (){
    return (
        <div className="relative w-full h-full bg-purple-300">

            <div className="w-1/2 h-1/2 bg-slate-400  absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
            <form >
                <label>Upload Image</label>
                <input type="file" ></input>
                <button onClick={handleImage}>submit</button>
            </form>
            </div>
        </div>
    )
}

export default Form