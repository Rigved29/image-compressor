import React from "react";
import imageCompression from "browser-image-compression";
import CompressedImg from "./CompressedImg";
import {useState} from "react";
import {storage} from "../firebase/firebase";
// import axios from 'axios'
import fileDownload from 'js-file-download'

const ImageInput =()=>{
    
    const [state,setState] = useState(false);
    const allInputs = {imgUrl: ''};
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);

    console.log(imageAsFile)

 const handleImageAsFile = (file) => {
      // const image = e.target.files[0];
      setImageAsFile(file);
  }


  const handleDownload = async(url, filename) => {
    // axios.get(url, {
    //   responseType: 'blob',
    // })
    // .then((res) => {
    //   fileDownload(res.data, filename)
    // })

    
  }
   
  
  
 
          
   
      const  handleImageUpload = async (event)=>{
  
            event.preventDefault();

            

            
            console.log(event.target.value);
            const imageFile = event.target.files[0];
            console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
            console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
          
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true
            }

            try {
              const compressedFile = await imageCompression(imageFile, options);
              console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
              console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

              handleImageAsFile(compressedFile);
          
             // await uploadToServer(compressedFile);  write your own logic
            } catch (error) {
              console.log(error);
            }
          
          }

          console.log(imageAsFile);


    const handleFireBaseUpload = e => {
      e.preventDefault()
    console.log('start of upload')
    // async magic goes here...

    if(imageAsFile === '' ) {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    }

    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       })
    })
    console.log(imageAsUrl);
    setState(true);

    }

    

    return (
      <section>
        <div className= " grid w-full my-5 ">
            <form className="grid bg-blue-500 p-5 sm:bg-blue-500 w-10/12 justify-self-center rounded-lg z-10 shadow-xl" onSubmit={handleFireBaseUpload}>
            <input type="file" accept="image/*" placeholder="UploadImage" className="border-2 p-2 m-2 rounded-md focus:bg-blue-100 outline-none" onChange={handleImageUpload}/>
            <input type="submit" className="bg-yellow-400 w-11/12 justify-self-center rounded-md md:w-3/12 text-center placeholder-black cursor-pointer" placeholder="submit"/>
            </form>
        </div>
        <div>
            <div className="py-4 text-red-600 font-semibold text-xl">Compressed Image</div>
            {state && <CompressedImg source={imageAsUrl.imgUrl}/>}
            {!state && <div>No Image Selected</div>}
            
            {/* <img src={imageAsUrl.imgUrl} alt="submitted image"/> */}
            {state && <a href={`${imageAsUrl.imgUrl}`} className="bg-blue-500 py-2 px-4 rounded cursor-pointer my-2" download="compressedImage">View Full Size
            </a>}
            {/* <button onClick={() => {handleDownload(imageAsUrl.imgUrl, 'test-download.jpg')
            }}>Download Image</button> */}
        </div>
      </section>
    );
}


export default ImageInput;