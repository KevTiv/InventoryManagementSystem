import '../../Styles/Components/BrandForm.scss';
import {useForm} from 'react-hook-form';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../../Utils/Firebase/firebase';
import { useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import { useCallback, useEffect, useState } from 'react';

type brandDormData ={
    brand_name: string,
    brand_country_of_origin: string,
    industry: string,
    brand_img: string,
    img_file: File
}
type newBrandObject ={
    brand_name: string,
    brand_country_of_origin: string,
    industry: string,
    brand_img: string,
}
export const AddBrandForm = () => {
    const axios = require('axios').default;
    const [token, setToken] = useState<string>();
    const [isDatacomplete, setIsDatacomplete] = useState<boolean>(false);
    const {register, handleSubmit, setValue} = useForm<brandDormData>();
    const { executeRecaptcha } = useGoogleReCaptcha();

    let newBrand:newBrandObject={
        'brand_name':'',
        'brand_country_of_origin':'',
        'industry':'',
        'brand_img': '',
    }

    const handleReCaptchaVerify = useCallback(async () => {
            if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
            }
            const token = await executeRecaptcha('yourAction');
            setToken(token);
    }, []);
    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    const uploadImage = (file:File, name:string) => {
            //const storageRef = ref(storage, 'images');
            console.log(file.type, '<-- type');
            const spaceRef = ref(storage, `image/brands/${name}`);
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
                    
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        console.log('uploadTask.snapshot.ref: ',uploadTask.snapshot.ref);
                        //setImgUrl(downloadURL);
                        setValue('brand_img', downloadURL);
                        
                    }).catch((error) => {
                        switch (error.code) {
                            case 'storage/object-not-found':
                                console.log('File doesn\'t exist');
                                break;
                            case 'storage/unauthorized':
                                console.log('User doesn\'t have permission to access the object');
                                break;
                            case 'storage/canceled':
                                console.log('User canceled the upload');
                                break;
                            case 'storage/unknown':
                                console.log('Unknown error occurred, inspect the server response')
                                break;
                        }
                    });
                    
                }
            );
    }

    const onSubmit = handleSubmit(async (data:brandDormData) => {
        
        if(token && token !== undefined && data.img_file  && data.img_file !== undefined){
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api/verify_token`,{
                request:{
                    token
                }
            }).then(async function (res:any){
                console.log('verifyRes: ', res.data.score);
                console.log(res);
                if(res.data.score > 0.5){
                    const file:any = data.img_file;
                    uploadImage(file[0], data.brand_name);
                }
                setIsDatacomplete(true);
                // return res.data.score;
            }).catch(function(err: any){
                console.error("err: ",err);
                // return err;
            });
        }
        if(isDatacomplete){
             newBrand.brand_name = data.brand_name
            newBrand.brand_country_of_origin = data.brand_country_of_origin;
            newBrand.industry = data.industry;
            newBrand.brand_img = data.brand_img;

            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/brand`,newBrand)
            .then(function (res: any){
                console.log("res: ",res);
            }).catch(function(err: any){
                console.error("err: ",err);
            });
        }
    });
    return (
        <>
            <form className="add-brand-form" onSubmit={onSubmit}> 
                <div className="input-form">
                    <label className="input-form-label" htmlFor="brand_name">Name</label>
                    <input
                        className="input-form-text-input"
                        id="brand_name"
                        type="text"
                        {...register("brand_name")} 
                    />

                    <label className="input-form-label" htmlFor="brand_country_of_origin">Country of origin</label>
                    <input
                        className="input-form-text-input"
                        id="brand_country_of_origin"
                        type="text"
                        {...register("brand_country_of_origin")} 
                    />

                    <label className="input-form-label" htmlFor="industry">Industry</label>
                    <input
                        className="input-form-text-input"
                        id="industry"
                        type="text"
                        {...register("industry")} 
                    />
                    <div className="input-form-fil-input">
                        <label className="input-form-label" htmlFor="img_file">Image file</label>
                        <input
                            
                            id="img_file"
                            type="file"
                            accept=".jpg, .png"
                            {...register("img_file")} 
                        />
                    </div>
                    
                </div>
                <div className="input-form-submit-button">
                    <button
                        onClick={handleReCaptchaVerify}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}