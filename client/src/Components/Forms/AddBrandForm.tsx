import '../../Styles/Components/BrandForm.scss';
import {useForm} from 'react-hook-form';
import {uploadImage} from '../../Utils/Firebase/Firebase';
import { useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {Tab, Listbox, Transition} from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import countries from '../../Utils/Assets/countries.json';
import industries from '../../Utils/Assets/industries.json';
import { useNavigate } from 'react-router-dom';

type brandFormData ={
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
    let navigate = useNavigate();
    
    const [token, setToken] = useState<string>();
    const [isImageUploadComplete, setImageUploadComplete] = useState<boolean>(false);
    const {register, handleSubmit, setValue} = useForm<brandFormData>();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [countrySelected, setCountrySelected] = useState<any>();
    const [industrySelected, setIndustrySelected] = useState<any>();

    let newBrand:newBrandObject={
        'brand_name':'',
        'brand_country_of_origin':'',
        'industry':'',
        'brand_img': '',
    }
     const CountrySelect =()=>{

        return(
            <>
                <div className="w-72">
                    <Listbox value={countrySelected} 
                        // onChange={setBrandSelected}
                        onChange={(e:any) => {
                            setValue("brand_country_of_origin",e);
                            setCountrySelected(e);
                        }}
                    >
                        <div className="flex w-full mx-auto">
                            <Listbox.Button 
                                className="relative w-9/12 h-9 py-2 text-left bg-white rounded shadow-md 
                                cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white 
                                focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ml-20"
                                >
                                <span className="block truncate  ml-5">
                                    {countrySelected}
                                    
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                                <SelectorIcon
                                    className="w-full h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options 
                                className="absolute w-2/6 py-1 mt-10 overflow-auto text-base
                                    bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {/* console.log('Countries: ', countries["country"][0].name); */}
                                {countries["country"]?.map((country, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={
                                            ({ active }) =>
                                            `${active ? 'text-blue-900 bg-blue-200' : 'text-gray-900'}
                                                cursor-default select-none relative py-2 pl-10 pr-4`
                                        }
                                        value={country.name}
                                    >
                                    {({ selected, active }) => (
                                        <>
                                        <span
                                            className={`${
                                            selected ? 'font-medium' : 'font-normal'
                                            } block truncate`}
                                            
                                            
                                        >
                                            {country.name}
                                        </span>
                                        {selected ? (
                                            <span
                                            className={`${
                                                active ? 'text-blue-600' : 'text-blue-600'
                                            }
                                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                        </>
                                    )}
                                    </Listbox.Option>
                                )
                                )
                                }
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </>
        )
    }

    const IndustrieSelect =()=>{
        return(
            <>
                <div className="w-72">
                    <Listbox 
                        value={industrySelected} 
                        onChange={(e:any) => {
                            setValue("industry",e);
                            setIndustrySelected(e);
                        }}
                    >
                        <div className="flex w-full mx-auto">
                            <Listbox.Button className="relative w-9/12 h-9 py-2 text-left bg-white rounded shadow-md cursor-default 
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white 
                            focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ml-3">
                                <span className="block truncate  ml-5">{industrySelected}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                                <SelectorIcon
                                    className="w-full h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options 
                                className="absolute w-2/6 py-1 mt-10 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                {industries["industries"].map((industry, index) => (
                                    <Listbox.Option
                                    key={index}
                                    className={
                                        ({ active }) =>
                                        `${active ? 'text-blue-900 bg-blue-200' : 'text-gray-900'}
                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                    }
                                    value={industry}
                                    >
                                    {({ selected, active }) => (
                                        <>
                                        <span
                                            className={`${
                                            selected ? 'font-medium' : 'font-normal'
                                            } block truncate`}
                                        >
                                            {industry}
                                            

                                        </span>
                                        {selected ? (
                                            <span
                                            className={`${
                                                active ? 'text-blue-600' : 'text-blue-600'
                                            }
                                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                        </>
                                    )}
                                    </Listbox.Option>
                                ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </>
        )
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
    
    

    const onSubmit = handleSubmit(async (brandInputFormData:brandFormData) => {
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
                        navigate('/');
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
                        className="input-form-text-input my-3"
                        id="brand_name"
                        type="text"
                        {...register("brand_name")} 
                    />
                    <div className="flex space-around mx-5 my-4">
                        <div>
                            <label className="input-form-label flex justify start" htmlFor="brand_country_of_origin">Country of origin</label>
                            {/* <input
                                className="input-form-text-input"
                                id="brand_country_of_origin"
                                type="text"
                                {...register("brand_country_of_origin")} 
                            /> */}
                            <CountrySelect/>
                        </div>
                        <div >
                            <label className="input-form-label" htmlFor="industry">Industry</label>
                            {/* <input
                                className="input-form-text-input"
                                id="industry"
                                type="text"
                                {...register("industry")} 
                            /> */}
                            <IndustrieSelect/>
                        </div>
                    </div>
                    <div className="input-form-file-input">
                        <label className="input-form-label " htmlFor="img_file">Image file</label>
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