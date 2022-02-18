import '../../Styles/Components/ProductForm.scss';
import {useForm} from 'react-hook-form';
import {uploadImage} from '../../Utils/Firebase/Firebase';
import { useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {Tab, Listbox, Transition} from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import {brandsAPICallProps} from '../../Components/Hero/DashboardHero';
import industries from '../../Utils/Assets/industries.json';
import currencies from '../../Utils/Assets/currencies.json';
import prodUnits from '../../Utils/Assets/productUnits.json';
import countries from '../../Utils/Assets/countries.json';
import { useNavigate } from 'react-router-dom';

type productFormData ={
    product_ref: string,
    product_name: string,
    product_brand_id: number,
    product_category: string,
    product_price: number,              
    product_gen_description: string,    
    product_gen_characteristic: string,            
    product_factory_price: number,      
    currency: string,                   
    product_weight: number,             
    product_coutry_of_origin: string,   
    product_sell_unit: string,          
    product_box_weight: number,         
    product_sku: string,                
    product_min_quanity: number,        
    product_volume: number,             
    product_custom_border_id: string,  
    product_box_quantity: number,       
    product_box_volume: number,         
    product_img: string,
    img_file: File
}
type newProductObject ={
    product_ref: string,
    product_name: string,
    product_brand_id: number,
    product_category: string,
    product_price: number,              
    product_gen_description: string,    
    product_gen_characteristic: string,            
    product_factory_price: number,      
    currency: string,                   
    product_weight: number,             
    product_coutry_of_origin: string,   
    product_sell_unit: string,          
    product_box_weight: number,         
    product_sku: string,                
    product_min_quanity: number,        
    product_volume: number,             
    product_custom_border_id: string,  
    product_box_quantity: number,       
    product_box_volume: number,         
    product_img: string,
}

const AddProductForm = () => {
    const destination = 'image/products/';

    let axios = require('axios').default;
    let navigate = useNavigate();
    
    const [brandData, setBrandData] = useState<brandsAPICallProps[]>();
    const [token, setToken] = useState<string>();
    const [isImageUploadComplete, setImageUploadComplete] = useState<boolean>(false);
    const {register, handleSubmit, setValue} = useForm<productFormData>();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [brandSelected, setBrandSelected] = useState<any>();
    const [industrySelected, setIndustrySelected] = useState<any>();
    const [currencySelected, setCurrencySelected] = useState<any>();
    const [prodUnitSelected, setProdUnitSelected] = useState<any>();
    const [countrySelected, setCountrySelected] = useState<any>();

    let newProduct:newProductObject={
        'product_ref': '',
        'product_name': '',
        'product_brand_id': 0,
        'product_category': '',
        'product_price': 1,              
        'product_gen_description': '',    
        'product_gen_characteristic': '',            
        'product_factory_price': 1,      
        'currency': 'EUR',                   
        'product_weight': 1,             
        'product_coutry_of_origin': '',   
        'product_sell_unit': 'Pieces',          
        'product_box_weight': 1,         
        'product_sku': '',                
        'product_min_quanity': 1,        
        'product_volume': 1,             
        'product_custom_border_id': '',  
        'product_box_quantity': 1,       
        'product_box_volume': 1,         
        'product_img': '',
    }
    const BrandSelect =()=>{
        return(
            <>
                <div className="w-72">
                    <Listbox value={brandSelected} 
                        // onChange={setBrandSelected}
                        onChange={(e:any) => {
                            setValue("product_brand_id",e.brand_id);
                            setBrandSelected(e.brand_name);
                        }}
                    >
                        <div className="flex justify-start w-full">
                            <Listbox.Button 
                                className="relative w-9/12 h-9 py-2 text-left bg-white rounded shadow-md 
                                cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white 
                                focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                                >
                                <span className="block truncate  ml-5">
                                    {brandSelected}
                                    {console.log(brandSelected)}
                                    
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
                                {brandData?.map((brand, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={
                                            ({ active }) =>
                                            `${active ? 'text-blue-900 bg-blue-200' : 'text-gray-900'}
                                                cursor-default select-none relative py-2 pl-10 pr-4`
                                        }
                                        value={{
                                            "brand_id":brand.brand_id,
                                            "brand_name": brand.brand_name
                                        }}
                                    >
                                    {({ selected, active }) => (
                                        <>
                                        <span
                                            className={`${
                                            selected ? 'font-medium' : 'font-normal'
                                            } block truncate`}
                                            
                                            
                                        >
                                            {brand.brand_id} - {brand.brand_name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3`} //${active ? 'text-blue-600' : 'text-blue-600'}
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

    const CountrySelect =()=>{

        return(
            <>
                <div className="w-72">
                    <Listbox value={countrySelected} 
                        // onChange={setBrandSelected}
                        onChange={(e:any) => {
                            setValue("product_coutry_of_origin",e);
                            setCountrySelected(e);
                        }}
                    >
                        <div className="flex w-full">
                            <Listbox.Button 
                                className="relative w-9/12 h-9 py-2 text-left bg-white rounded shadow-md 
                                cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white 
                                focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
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
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3`} //${active ? 'text-blue-600' : 'text-blue-600'}
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

    const ProductUnitSelect =()=>{

        return(
            <>
                <div className="w-72">
                    <Listbox value={prodUnitSelected} 
                        onChange={(e:any) => {
                            setValue("product_sell_unit",e);
                            setProdUnitSelected(e);
                        }}
                    >
                        <div className="flex w-full">
                            <Listbox.Button className="relative w-9/12 h-9 py-2 text-left bg-white rounded shadow-md 
                                cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white 
                                focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm
                                ">
                                <span className="block truncate  ml-5">{prodUnitSelected}</span>
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
                                    bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                {prodUnits["unit"].map((unit, index) => (
                                    <Listbox.Option
                                    key={index}
                                    className={
                                        ({ active }) =>
                                        `${active ? 'text-blue-900 bg-blue-200' : 'text-gray-900'}
                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                    }
                                    value={unit}
                                    >
                                    {({ selected, active }) => (
                                        <>
                                        <span
                                            className={`${
                                            selected ? 'font-medium' : 'font-normal'
                                            } block truncate`}
                                        >
                                            {unit}
                                            

                                        </span>
                                        {selected ? (
                                            <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3`} //${active ? 'text-blue-600' : 'text-blue-600'} 
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
    const CurrenciesSelect =()=>{

        return(
            <>
                <div className="w-72">
                    <Listbox 
                        value={currencySelected} 
                        onChange={(e:any) => {
                            setValue("currency",e);
                            setCurrencySelected(e);
                        }}
                    >
                        <div className="flex justify-start w-full">
                            <Listbox.Button className="relative w-9/12 h-9 py-2 text-left bg-white rounded shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate  ml-5">{currencySelected}</span>
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
                                {currencies["currency"].map((currency, index) => (
                                    <Listbox.Option
                                    key={index}
                                    className={
                                        ({ active }) =>
                                        `${active ? 'text-blue-900 bg-blue-200' : 'text-gray-900'}
                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                    }
                                    value={currency}
                                    >
                                    {({ selected, active }) => (
                                        <>
                                        <span
                                            className={`${
                                            selected ? 'font-medium' : 'font-normal'
                                            } block truncate`}
                                        >
                                            {currency}
                                            

                                        </span>
                                        {selected ? (
                                            <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3`} //${active ? 'text-blue-600' : 'text-blue-600'}
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
    const IndustrieSelect =()=>{
        return(
            <>
                <div className="w-72">
                    <Listbox 
                        value={industrySelected} 
                        onChange={(e:any) => {
                            setValue("product_category",e);
                            setIndustrySelected(e);
                        }}
                    >
                        <div className="flex justify-start w-full">
                            <Listbox.Button className="relative w-9/12 h-9 py-2 text-left bg-white rounded shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
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
                                {...register("product_category")}
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
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3`} //${active ? 'text-blue-600' : 'text-blue-600'}
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
    const ProductInputFormPage1 = ()=>{
        return(
            <>
                <div className="prod-input-container prod-ref">
                    <label className="input-form-label" htmlFor="product_reference">Reference</label>
                    <input
                        className="input-form-text-input"
                        id="product_reference"
                        type="text"
                        {...register("product_ref")} 
                    />
                </div>
                <div className="prod-input-container prod-name-brand">
                    <div>
                        <label className="input-form-label" htmlFor="product_name">Name</label>
                        <input
                            className="input-form-text-input"
                            id="product_name"
                            type="text"
                            {...register("product_name")} 
                        />
                    </div>
                    <div>
                        <label className="input-form-label" htmlFor="product_brand">Brand</label>
                        <BrandSelect/>
                    </div>
                </div>
                <div className="prod-cat-price prod-input-container  flex justifify-center mx-auto">
                    {/* prod-input-container  */}
                    <div>
                        <label className="input-form-label" htmlFor="product_category">Category</label>
                        <IndustrieSelect/>
                    </div>
                    
                    <div>
                        <label className="input-form-label" htmlFor="product_sku">SKU</label>
                        <input
                            className="input-form-text-input"
                            id="product_sku"
                            type="text"
                            {...register("product_sku")} 
                        />
                    </div>
                </div>
                <div className="prod-input-container prod-charact-description">
                    <div>
                        <label className="input-form-label" htmlFor="product_gen_description">General description</label>
                        <textarea
                            className="input-form-text-input"
                            id="product_gen_description"
                            {...register("product_gen_description")} 
                        />
                    </div>
                    <div>
                        <label className="input-form-label" htmlFor="product_gen_characteristic">General characteristics</label>
                        <textarea
                            className="input-form-text-input"
                            id="product_gen_characteristic"
                            {...register("product_gen_characteristic")} 
                        />
                    </div>
                </div>
                
            </>
        )
    }
    const ProductInputFormPage2 =() => {
        return(
            <>
                <div className="small-input-page">
                    <div className="prod-input-container">
                        <div>
                            <label className="input-form-label" htmlFor="product_factory_price">Factory Price</label>
                            <input
                                className="input-form-text-input"
                                id="product_factory_price"
                                type="number"
                                {...register("product_factory_price",{ min: 0})} 
                            />
                        </div>
                        <div>
                            <label className="input-form-label" htmlFor="product_coutry_of_origin">Country of origin</label>
                            <CountrySelect/>
                        </div>
                    </div>
                    <div className="prod-input-container">
                        <div>
                            <label className="input-form-label" htmlFor="product_custom_border_id">Custom & border ID</label>
                            <input
                                className="input-form-text-input"
                                id="product_custom_border_id"
                                type="text"
                                {...register("product_custom_border_id")} 
                            />
                        </div>
                        <div>
                            <label className="input-form-label" htmlFor="product_min_quanity">Min. quantity in stock</label>
                            <input
                                className="input-form-text-input"
                                id="product_min_quanity"
                                type="number"
                                {...register("product_min_quanity",{ min: 0})} 
                            />
                        </div>
                    </div>
                    <div className="prod-input-container">
                        <div>
                            <label className="input-form-label" htmlFor="product_sell_unit">Unit</label>
                            <ProductUnitSelect/>
                        </div>
                        
                        <div>
                            <label className="input-form-label" htmlFor="product_box_quantity">Box quantity</label>
                            <input
                                className="input-form-text-input"
                                id="product_box_quantity"
                                type="number"
                                {...register("product_box_quantity",{ min: 0})} 
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    const ProductInputFormPage3 = () => {
        return(
            <>
                <div className="small-input-page">
                    <div className="prod-input-container">
                        <div>
                            <label className="input-form-label" htmlFor="product_price">Price</label>
                            <input
                                className="input-form-text-input"
                                id="product_price"
                                type="number"
                                {...register("product_price",{ min: 0})} 
                            />
                        </div>
                        <div>
                            <label className="input-form-label" htmlFor="currency">Currency</label>
                            <CurrenciesSelect/>
                        </div>
                    </div>
                    <div className="prod-input-container">
                        <div>
                            <label className="input-form-label" htmlFor="product_weight">Weight</label>
                            <input
                                className="input-form-text-input"
                                id="product_weight"
                                type="number"
                                {...register("product_weight",{ min: 0})} 
                            />
                        </div>
                        <div>
                            <label className="input-form-label" htmlFor="product_box_weight">Box weight</label>
                            <input
                                className="input-form-text-input"
                                id="product_box_weight"
                                type="number"
                                {...register("product_box_weight",{ min: 0})} 
                            />
                        </div>
                    </div>
                    <div className="prod-input-container">
                        <div>
                            <label className="input-form-label" htmlFor="product_volume">Volume</label>
                            <input
                                className="input-form-text-input"
                                id="product_volume"
                                type="number"
                                {...register("product_volume",{ min: 0})} 
                            />
                        </div>
                        <div>
                            <label className="input-form-label" htmlFor="product_box_volume">Box volume</label>
                            <input
                                className="input-form-text-input"
                                id="product_box_volume"
                                type="number"
                                {...register("product_box_volume",{ min: 0})} 
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }   

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const handleReCaptchaVerify = useCallback(async () => {
            if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
            }
            const newToken = await executeRecaptcha('yourAction');
            setToken(newToken);
    }, []);

    const setURL = (downloadURL:string) => {
        setValue('product_img', downloadURL);
    }
    const setUploadComplete = () =>{
        setImageUploadComplete(true);
    }

    const onSubmit = handleSubmit(async (data:productFormData) => {
        if(token && token !== undefined && data.img_file  && data.img_file !== undefined){
            //Check first if request is not from a bot.
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api/verify_token`,{
                request:{
                    token
                }
            }).then(async function (res:any){
                if(res.data.score > 0.5){
                    const file:any = data.img_file;
                    uploadImage(file[0], data.product_name, destination, setURL, setUploadComplete);
                    if(isImageUploadComplete === false || data.product_img.length === 0){
                        //if state manager didn't reflect the isImageUploadComplete change of state
                        // leave 4 seconds for new URL to be returned and continue with upload of new brand.
                        new Promise(resolve => setTimeout(resolve, 4500));
                    }

                    newProduct.product_ref = data.product_ref
                    newProduct.product_name = data.product_name;
                    newProduct.product_brand_id = parseInt(`${data.product_brand_id}`);
                    newProduct.product_category = data.product_category;
                    newProduct.product_price = parseInt(`${data.product_price}`);
                    newProduct.product_gen_description = data.product_gen_description;
                    newProduct.product_gen_characteristic = data.product_gen_characteristic;
                    newProduct.product_factory_price = parseInt(`${data.product_factory_price}`);
                    newProduct.currency = data.currency
                    newProduct.product_weight = parseInt(`${data.product_weight}`);
                    newProduct.product_coutry_of_origin = data.product_coutry_of_origin;
                    newProduct.product_sell_unit = data.product_sell_unit;
                    newProduct.product_box_weight = parseInt(`${data.product_box_weight}`);
                    newProduct.product_sku = data.product_sku;
                    newProduct.product_min_quanity = parseInt(`${data.product_min_quanity}`);
                    newProduct.product_volume = parseInt(`${data.product_volume}`);
                    newProduct.product_custom_border_id = data.product_custom_border_id;
                    newProduct.product_box_quantity = parseInt(`${data.product_box_quantity}`);
                    newProduct.product_box_volume = parseInt(`${data.product_box_volume}`);
                    newProduct.product_img = data.product_img;

                    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/product`,newProduct)
                    .then(function (res: any){
                        setImageUploadComplete(false);
                    }).catch(function(err: any){
                        setImageUploadComplete(false);
                    }); 
                    console.log('newProduct: ',newProduct);
                
                }
            }).catch(function(err: any){
                console.error("err: ",err);
            });
        }
    });
    useEffect(() => {
        const axios = require('axios').default;
        const fetchBrandData = async ()=>{ 
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/brand`)
                .then((res: any)=>{
                    const data = res.data;
                    setBrandData(data);
                })
                .catch((err: any) => {
                    console.error(err);
                })
        }
        fetchBrandData();
        return ()=>{
            setBrandData([]);
        }
    },[]);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    return (
        <>        
            <form className="add-product-form" onSubmit={onSubmit}> 
                <h1>Add a new product</h1>
                <Tab.Group>
                    <Tab.List className="add-product-tab">
                        <Tab className={({ selected }) =>
                            classNames(
                            'w-full py-4 text-sm leading-5 font-medium text-gray-300 rounded-tl-2xl rounded-br-2xl',
                            'focus:outline-none ring-offset-2 ring-offset-gray-700 ring-white ring-opacity-60',
                            selected
                                ? 'dark:bg-gray-200 text-gray-600 bg-gray-200 shadow-lg'
                                : 'text-gray-400 hover:bg-gray-400 hover:text-gray-200 dark:hover:text-white bg-gray-300 dark:bg-gray-600'
                            )
                        }>1</Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                            'w-full py-4text-sm leading-5 font-medium text-gray-300 rounded-xl',
                            'focus:outline-none ring-offset-2 ring-offset-gray-700 ring-white ring-opacity-60',
                            selected
                                ? 'dark:bg-gray-200 text-gray-600 bg-gray-200 shadow-lg'
                                : 'text-gray-400 hover:bg-gray-400 hover:text-gray-200 dark:hover:text-white bg-gray-300 dark:bg-gray-600'
                            )
                        }>2</Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                            'w-full py-4text-sm leading-5 font-medium text-gray-300 rounded-bl-2xl rounded-tr-2xl',
                            'focus:outline-none ring-offset-2 ring-offset-gray-700 ring-white ring-opacity-60',
                            selected
                                ? 'dark:bg-gray-200 text-gray-600 bg-gray-200 shadow-lg'
                                : 'text-gray-400 hover:bg-gray-400 hover:text-gray-200 dark:hover:text-white bg-gray-300 dark:bg-gray-600'
                            )
                        }>3</Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <ProductInputFormPage1/>
                        </Tab.Panel>
                        <Tab.Panel>
                            <ProductInputFormPage2/>
                        </Tab.Panel>
                        <Tab.Panel>
                            <ProductInputFormPage3/>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                
                <div className="input-form-file-input">
                    <label className="input-form-label" htmlFor="img_file">Image file</label>
                    <input
                        id="img_file"
                        type="file"
                        accept=".jpg, .png"
                        {...register("img_file")} 
                    />
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
export default AddProductForm;