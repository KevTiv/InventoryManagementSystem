import '../../Styles/Components/BrandForm.scss';
import {useForm} from 'react-hook-form';
import {uploadImage} from '../../Utils/Firebase/firebase';
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
    const destination = 'image/brands/';

    const axios = require('axios').default;
    const [token, setToken] = useState<string>();
    const [isImageUploadComplete, setImageUploadComplete] = useState<boolean>(false);
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

    const setURL = (downloadURL:string) => {
        setValue('brand_img', downloadURL);
    }
    const setUploadComplete = () =>{
        setImageUploadComplete(true);
    }
    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);
    
    

    const onSubmit = handleSubmit(async (brandInputFormData:brandDormData) => {
        if(token && token !== undefined && brandInputFormData.img_file  && brandInputFormData.img_file !== undefined){
            //Check first if request is not from a bot.
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api/verify_token`,{
                request:{
                    token
                }
            }).then(async function (res:any){
                // console.log('verifyRes: ', res.brandInputFormData.score);
                // console.log(res);
                if(res.brandInputFormData.score > 0.5){
                    const file:any = brandInputFormData.img_file;
                    uploadImage(file[0], brandInputFormData.brand_name, destination, setURL, setUploadComplete);
                    if(isImageUploadComplete === false || brandInputFormData.brand_img.length === 0){
                        //if state manager didn't reflect the isImageUploadComplete change of state
                        // leave 4 seconds for new URL to be returned and continue with upload of new brand.
                        new Promise(resolve => setTimeout(resolve, 4000));
                    }

                    newBrand.brand_name = brandInputFormData.brand_name
                    newBrand.brand_country_of_origin = brandInputFormData.brand_country_of_origin;
                    newBrand.industry = brandInputFormData.industry;
                    newBrand.brand_img = brandInputFormData.brand_img;

                    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/brand`,newBrand)
                    .then(function (res: any){
                        console.log("res: ",res);
                        setImageUploadComplete(false);
                    }).catch(function(err: any){
                        console.error("err: ",err);
                        setImageUploadComplete(false);
                    });
                }
            }).catch(function(err: any){
                console.error("err: ",err);
                // return err;
            });
        }
        
    });
    return (
        <>
            <form className="add-brand-form" onSubmit={onSubmit}> 
                <h1>Add a new brand</h1>
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
                    <div className="input-form-file-input">
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