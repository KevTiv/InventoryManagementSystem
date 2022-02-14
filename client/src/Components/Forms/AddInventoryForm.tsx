import '../../Styles/Components/InventoryForm.scss';
import {useForm} from 'react-hook-form';
import { useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {Listbox, Transition} from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { productsAPICallProps} from '../../Components/Hero/DashboardHero';
import { useNavigate } from 'react-router-dom';

type inventoryFormData ={
    product_id: number,
    inventory_price: number,
    currency: string,
    product_brand_id: number,
    inventory_quantity: number,
}
type productInventorySelected  ={
    name?: string,
    product_id: number,
    inventory_price: number,
    currency: string,
    product_brand_id: number,
    inventory_quantity: number,
    product_mouvement?: JSON
}
export const AddInventoryForm = () => {
    const axios = require('axios').default;
    let navigate = useNavigate();
    
    const [token, setToken] = useState<string>();
    const [productData, setProductData] = useState<productsAPICallProps[]>();
    const {register, handleSubmit, setValue} = useForm<inventoryFormData>();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [productSelected, setProductSelected] = useState<any>();
    const [isProductInInventory, setIsProductInInventory] = useState<boolean>(false)

    const ProductSelect =()=>{

        return(
            <>
                <div className="w-72">
                    <Listbox value={productSelected} 
                        // onChange={setBrandSelected}
                        onChange={(inventoryPorductSelected:productInventorySelected) => {
                            setValue("product_id",inventoryPorductSelected.product_id);
                            setValue("inventory_price",inventoryPorductSelected.inventory_price);
                            setValue("product_brand_id",inventoryPorductSelected.product_brand_id);
                            setValue("product_id",inventoryPorductSelected.product_id);
                            setValue("currency", inventoryPorductSelected.currency);

                            setProductSelected(inventoryPorductSelected.name);
                        }}
                    >
                        <div className="flex w-full mx-auto">
                            <Listbox.Button 
                                className="relative w-8/12 h-9 py-2 text-left bg-white rounded shadow-md 
                                cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white 
                                focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ml-20"
                                >
                                <span className="block truncate  ml-5">
                                    {productSelected}
                                    
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
                                    className="absolute w-2/6 py-1 mt-10 overflow-auto text-base ml-20
                                        bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {productData?.map((product, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={
                                                    ({ active }) =>
                                                    `${active ? 'text-blue-900 bg-blue-200' : 'text-gray-900'}
                                                        cursor-default select-none relative py-2 pl-10 pr-4`
                                                }
                                                value={
                                                    {
                                                        "product_id":product.product_id,
                                                        "name": `${product.product_ref} - ${product.product_name}`,
                                                        "inventory_price": product.product_price,
                                                        "currency": product.currency,
                                                        "product_brand_id": product.product_brand_id,
                                                    }
                                                }
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                    <span
                                                        className={`${
                                                        selected ? 'font-medium' : 'font-normal'
                                                        } block truncate`}
                                                        
                                                        
                                                    >
                                                        {product.product_ref}-{product.product_name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                        
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3`} // ${ active ? 'text-blue-600' : 'text-blue-600'}
                                                        >
                                                            <CheckIcon className="w-5 h-5 ml-3" aria-hidden="true" />
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


    const handleReCaptchaVerify = useCallback(async () => {
            if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
            }
            const newToken = await executeRecaptcha('yourAction');
            setToken(newToken);
    }, []);
    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);
    
    

    const onSubmit = handleSubmit(async (data:inventoryFormData) => {
    // const onSubmit = handleSubmit(async (inventoryInputFormData:inventoryFormData) => {

        if(token && token !== undefined ){
            //Check first if request is not from a bot.
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api/verify_token`,{
                request:{
                    token
                }
            }).then(async function (res:any){
                if(res.data.score > 0.5){

                    data.product_id = parseInt(`${data.product_id}`);
                    data.inventory_price = parseInt(`${data.inventory_price}`);
                    data.inventory_quantity = parseInt(`${data.inventory_quantity}`);
                    data.product_brand_id = parseInt(`${data.product_brand_id}`);

                    //If product exist in the inventory Db update else create new entry
                    await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/inventory/${data.product_id}`)
                    .then(async ()=>{
                        setIsProductInInventory(true);

                    }).catch(async function(err: any){
                        console.error("err: ",err);
                        setIsProductInInventory(false);
                    });
                    if(isProductInInventory === true){
                        await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/inventory/${data.product_id}`,data)
                        .then(()=>{
                            navigate('/');
                        }).catch(function(err: any){
                            console.error("err: ",err);
                        });
                    }else{
                        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/inventory`,data)
                        .then(()=>{
                            navigate('/');
                        }).catch(function(err: any){
                            console.error("err: ",err);
                        });
                    }
                    
                }
            }).catch((err: any)=>{
                console.error("err: ",err);
                // return err;
            });
        }
        
    });
    useEffect(() => {
        const axios = require('axios').default;
        const fetchProductData = async ()=>{ 
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/product`)
                .then((res: any)=>{
                    const data = res.data;
                    setProductData(data);
                })
                .catch((err: any) => {
                    console.error(err);
                })
        }
        fetchProductData();
        
        return ()=>{
            setProductData([]);
        }
    },[]);
    return (
        <>
            <form className="add-inventory-form" onSubmit={onSubmit}> 
                <h1>Add a new inventory</h1>
                <div className="inventory-input-container">
                    <div>
                        <label className="input-form-label" htmlFor="brand_name">Product</label>
                        <ProductSelect/>
                    </div>
                    <div>
                        <label className="input-form-label flex justify start" htmlFor="brand_country_of_origin">Quantity</label>
                        <input
                            className="input-form-text-input"
                            id="brand_country_of_origin"
                            type="number"
                            {...register("inventory_quantity")} 
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