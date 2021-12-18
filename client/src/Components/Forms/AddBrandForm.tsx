import React, { useState } from 'react'
import { useFormik } from 'formik';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import {storage} from '../../Utils/Firebase/firebase';

export const AddBrandForm = () => {
    const axios = require('axios').default;
    const [file, setFile] = useState<File>();
    const [imgUrl, setImgUrl] = useState<string>();

    const onChangeImgageFile = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            setFile(files[0])
        }
        console.log(file);
    }
    const uploadImage =(file:File, name:string) => {
        const storageRef = ref(storage, 'images');
        const spaceRef = ref(storage, `images/${name}`);
        const metadata = {
            // contentType: 'image/jpeg',
            contentType: file.type,
        };

        const uploadTask = uploadBytesResumable(spaceRef, file, metadata);
        console.log('uploadTask : ', uploadTask)
        uploadTask.on('state_changed', 
            (snapshot: { bytesTransferred: number; totalBytes: number; state: any; }) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error:any) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                console.log('uploadTask2 : ', uploadTask)
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImgUrl(downloadURL);
                });
            }
        );
        console.log('uploadTask3 : ', uploadTask)
    }
    const formik = useFormik({
        initialValues:{
            brand_name: '',              
            brand_country_of_origin: '', 
            industry: '',             
            brand_img: '',               
        },onSubmit: async (values) =>{
            if(file && file !== undefined) {
                uploadImage(file, values.brand_name);
                values.brand_img = imgUrl!;
            }
            // await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/brand`,values)
            //     .then(function (res: any){
            //         console.log("res: ",res);
            //     }).catch(function(err: any){
            //         console.error("err: ",err);
            //     });
        }
    })

    return (
        <>
            <form className="w-72" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="brand_name">Name</label>
                    <input
                        id="brand_name"
                        name="brand_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.brand_name}
                    />

                    <label htmlFor="brand_country_of_origin">Country of origin</label>
                    <input
                        id="brand_country_of_origin"
                        name="brand_country_of_origin"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.brand_country_of_origin}
                    />

                    <label htmlFor="industry">Industry</label>
                    <input
                        id="industry"
                        name="industry"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.industry}
                    />

                    <label htmlFor="img_file">Image file</label>
                    <input
                        id="img_file"
                        name="img_file"
                        type="file"
                        onChange={onChangeImgageFile}
                        accept=".jpg, .png"
                    />
                </div>
                <div className="flex align-center justify-center">
                    <button 
                        type="submit"
                        data-sitekey="reCAPTCHA_site_key" 
                        data-callback='onSubmit' 
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}


