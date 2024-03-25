import { app } from "firebas";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import fileUpload from "utils/fileUpload";


function File() {
  const [formData, setFormData] = useState({
    pic: "",
  });

const[imageUrl,setImageUrl]=useState()

  const changeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.files[0],
      };
    });
  };
  const clickHandler = async (e) => {
  const picture=formData.pic
    e.preventDefault();
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}${picture}`;
  
    const storageRef = ref(storage, fileName);
    // await uploadBytesResumable(storageRef, picture);
    // const url = await storageRef.getDownloadURL();
    // console.log(url)
  
    const uploadTask = await   uploadBytesResumable(storageRef, picture);
   
console.log(uploadTask)
 storageRef.getDownloadURL().then((res)=>{
  console.log(res)
});

  //  uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {},
  //     (error) => {
  //       console.log('Wef')
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log('uploaded successfully');
  //         console.log(downloadURL)
  //         setImageUrl(downloadURL)
         
  //       });
  //     }
  //   );
   
   console.log('tuhin')
   console.log(imageUrl)
  };
  return (
    <div>
      <form>
        <input
          type="file"
          name="pic"
          onChange={(e) => {
            changeHandler(e);
          }}
        />
        <button onClick={clickHandler}>WEFEWF</button>
      </form>
    </div>
  );
}

export default File;
