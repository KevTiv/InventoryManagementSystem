import '../../Styles/Components/ProductForm.scss';
import {useForm} from 'react-hook-form';
import {uploadImage} from '../../Utils/Firebase/firebase';
import { useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import { useCallback, useEffect, useState } from 'react';
import {Tab} from '@headlessui/react';

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

    const axios = require('axios').default;
    const [token, setToken] = useState<string>();
    const [isImageUploadComplete, setImageUploadComplete] = useState<boolean>(false);
    const {register, handleSubmit, setValue} = useForm<productFormData>();
    const { executeRecaptcha } = useGoogleReCaptcha();

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

    const handleReCaptchaVerify = useCallback(async () => {
            if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
            }
            const token = await executeRecaptcha('yourAction');
            setToken(token);
    }, []);

    const setURL = (downloadURL:string) => {
        setValue('product_img', downloadURL);
    }
    const setUploadComplete = () =>{
        setImageUploadComplete(true);
    }
    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);
    
    

    const onSubmit = handleSubmit(async (data:productFormData) => {
        if(token && token !== undefined && data.img_file  && data.img_file !== undefined){
            //Check first if request is not from a bot.
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api/verify_token`,{
                request:{
                    token
                }
            }).then(async function (res:any){
                // console.log('verifyRes: ', res.data.score);
                // console.log(res);
                if(res.data.score > 0.5){
                    const file:any = data.img_file;
                    uploadImage(file[0], data.product_name, destination, setURL, setUploadComplete);
                    if(isImageUploadComplete === false || data.product_img.length === 0){
                        //if state manager didn't reflect the isImageUploadComplete change of state
                        // leave 4 seconds for new URL to be returned and continue with upload of new brand.
                        new Promise(resolve => setTimeout(resolve, 4000));
                    }

                    newProduct.product_ref = data.product_ref
                    newProduct.product_name = data.product_name;
                    newProduct.product_brand_id = data.product_brand_id;
                    newProduct.product_category = data.product_category;
                    newProduct.product_price = data.product_price
                    newProduct.product_gen_description = data.product_gen_description;
                    newProduct.product_gen_characteristic = data.product_gen_characteristic;
                    newProduct.product_factory_price = data.product_factory_price;
                    newProduct.currency = data.currency
                    newProduct.product_weight = data.product_weight;
                    newProduct.product_coutry_of_origin = data.product_coutry_of_origin;
                    newProduct.product_sell_unit = data.product_sell_unit;
                    newProduct.product_box_weight = data.product_box_weight;
                    newProduct.product_sku = data.product_sku;
                    newProduct.product_min_quanity = data.product_min_quanity;
                    newProduct.product_volume = data.product_volume;
                    newProduct.product_custom_border_id = data.product_custom_border_id;
                    newProduct.product_box_quantity = data.product_box_quantity;
                    newProduct.product_box_volume = data.product_box_volume;
                    newProduct.product_img = data.product_img;

                    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/product`,newProduct)
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
    const ProductInputFormPage1 = ()=>{
        return(
            <>
                <div className="prod-input-container prod-ref">
                    <label className="input-form-label" htmlFor="product_reference">Reference</label>
                    <input
                        className="input-form-text-input"
                        id="product_reference"
                        type="text"
                    />
                </div>
                <div className="prod-input-container prod-name-brand">
                    <div>
                        <label className="input-form-label" htmlFor="product_name">Name</label>
                        <input
                            className="input-form-text-input"
                            id="product_name"
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="input-form-label" htmlFor="product_brand">Brand</label>
                        <input
                            className="input-form-text-input"
                            id="product_brand"
                            type="text"
                        />
                    </div>
                </div>
                <div className="prod-input-container prod-cat-price">
                    <div>
                        <label className="input-form-label" htmlFor="product_category">Category</label>
                        <input
                            className="input-form-text-input"
                            id="product_category"
                            type="text"
                        />
                    </div>
                    
                    <div>
                        <label className="input-form-label" htmlFor="product_price">Price</label>
                        <input
                            className="input-form-text-input"
                            id="product_price"
                            type="number"
                        />
                    </div>
                </div>
                <div className="prod-input-container">
                    <div>
                        <label className="input-form-label" htmlFor="currency">Currency</label>
                        <input
                            className="input-form-text-input"
                            id="currency"
                            type="text"
                        />
                    </div>
                    
                    <div>
                        <label className="input-form-label" htmlFor="product_sell_unit">Unit</label>
                        <input
                            className="input-form-text-input"
                            id="product_sell_unit"
                            type="text"
                        />
                    </div>
                </div>
                <div className="prod-input-container prod-charact-description">
                    <div>
                        <label className="input-form-label" htmlFor="product_gen_description">General description</label>
                        <textarea
                            className="input-form-text-input"
                            id="product_gen_description"
                        />
                    </div>
                    <div>
                        <label className="input-form-label" htmlFor="product_gen_characteristic">General characteristics</label>
                        <textarea
                            className="input-form-text-input"
                            id="product_gen_characteristic"
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
                            />
                        </div>
                        <div>
                            <label className="input-form-label" htmlFor="product_coutry_of_origin">Country of origin</label>
                            <input
                                className="input-form-text-input"
                                id="product_coutry_of_origin"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="prod-input-container">
                        <div>
                            <label className="input-form-label" htmlFor="product_sku">SKU</label>
                            <input
                                className="input-form-text-input"
                                id="product_sku"
                                type="text"
                            />
                        </div>
                        
                        <div>
                            <label className="input-form-label" htmlFor="product_custom_border_id">Custom & border ID</label>
                            <input
                                className="input-form-text-input"
                                id="product_custom_border_id"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="prod-input-container">
                        <div>
                            <label className="input-form-label" htmlFor="product_min_quanity">Min. quantity in stock</label>
                            <input
                                className="input-form-text-input"
                                id="product_min_quanity"
                                type="number"
                            />
                        </div>
                        
                        <div>
                            <label className="input-form-label" htmlFor="product_box_quantity">Box quantity</label>
                            <input
                                className="input-form-text-input"
                                id="product_box_quantity"
                                type="number"
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
                            <label className="input-form-label" htmlFor="product_weight">Weight</label>
                            <input
                                className="input-form-text-input"
                                id="product_weight"
                                type="number"
                            />
                        </div>
                        <div>
                            <label className="input-form-label" htmlFor="product_box_weight">Box weight</label>
                            <input
                                className="input-form-text-input"
                                id="product_box_weight"
                                type="number"
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
                            />
                        </div>
                        <div>
                            <label className="input-form-label" htmlFor="product_box_volume">Box volume</label>
                            <input
                                className="input-form-text-input"
                                id="product_box_volume"
                                type="number"
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
    return (
        <>
            <form className="add-product-form" onSubmit={onSubmit}> 
                <h1>Add a new product</h1>
                <Tab.Group>
                    <Tab.List className="add-product-tab">
                        <Tab className={({ selected }) =>
                            classNames(
                            'w-full py-4 text-sm leading-5 font-medium text-gray-300 rounded-lg',
                            'focus:outline-none ring-offset-2 ring-offset-gray-700 ring-white ring-opacity-60',
                            selected
                                ? 'dark:bg-gray-200 text-gray-600 bg-gray-200 shadow-lg'
                                : 'text-gray-400 hover:bg-gray-400 hover:text-gray-200 dark:hover:text-white bg-gray-300 dark:bg-gray-600'
                            )
                        }>1</Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                            'w-full py-4text-sm leading-5 font-medium text-gray-300 rounded-lg',
                            'focus:outline-none ring-offset-2 ring-offset-gray-700 ring-white ring-opacity-60',
                            selected
                                ? 'dark:bg-gray-200 text-gray-600 bg-gray-200 shadow-lg'
                                : 'text-gray-400 hover:bg-gray-400 hover:text-gray-200 dark:hover:text-white bg-gray-300 dark:bg-gray-600'
                            )
                        }>2</Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                            'w-full py-4text-sm leading-5 font-medium text-gray-300 rounded-lg',
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