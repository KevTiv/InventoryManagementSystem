import { useEffect, useState } from 'react';
import CurrencyCard from '../Cards/CurrencyCard';
import {Icon} from '@iconify/react';
import Menu from '@iconify/icons-dashicons/menu';
import Table from '../Table/Table';
import { Transition } from '@headlessui/react';

type dashboardProps={
    showInventoryTable: boolean,
    showProductTable: boolean,
    showBrandTable: boolean,
    onClickInventoryTableOption: () => void,
    onClickProductTableOption: () => void,
    onClickBrandTableOption: () => void
}
export type productsAPICallProps ={
    product_id: number,
    product_ref: string,
    product_name: string,
    product_brand_id: number,
    product_category?: string,
    product_price: number,
    product_gen_description?: string,
    product_gen_characteristic?: string,
    date_created: Date,
    product_factory_price: number,
    currency: string,
    product_weight: number,
    product_coutry_of_origin?: string,
    product_sell_unit: string,
    product_box_weight: number,
    product_sku?: string,
    product_min_quanity: number,
    product_volume: number,
    product_custom_border_id?: string,
    product_box_quantity: number,
    product_box_volume: number,
    product_img?: string 
}

export type brandsAPICallProps ={
    brand_id: number,
    brand_name: string,
    brand_country_of_origin?: string,
    industry?: string,
    date_created: Date,
    brand_img?: string
}

export type inventoryAPICallProps ={
    inventory_id: number,
    product_id: number,
    product_name: string,
    product_reference_name: string,
    order_id?: number,
    inventory_price?: number,
    currency: string,
    product_brand_id: number,
    product_brand_name: string,
    date_created: Date,
    inventory_quantity: number,
    last_updated: Date,
    agent_id?: number,
    product_mouvement?: JSON
}
const DashboardHero = (
    {showInventoryTable, showProductTable, showBrandTable, onClickInventoryTableOption, 
        onClickProductTableOption, onClickBrandTableOption}:dashboardProps) => {
    
    //const axios = require('axios').default;

    const brandTableHeaders:string[] = ["Name", "Industry", "Country Of Origin"];
    const productTableHeaders: string[] = ["Reference", "Name", "Brand", "Category", "Price"];
    const inventoryTableHeaders: string[] = ["Name", "Brand", "Stock", "Price", "Last Updated"];

    const [brandData, setBrandData] = useState<brandsAPICallProps[]>();
    const [productData, setProductData] = useState<productsAPICallProps[]>();
    const [inventoryData, setInventoryData] = useState<inventoryAPICallProps[]>();
    
    useEffect(() => {
        const axios = require('axios').default;
        const fetchBrandData = async ()=>{ 
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/brand`)
                .then((res: any)=>{
                    //console.log(res);
                    const data = res.data;
                    setBrandData(data);
                    //console.log(brandData);
                })
                .catch((err: any) => {
                    console.error(err);
                })
        }
        fetchBrandData();
        return ()=>{
            setBrandData([]);
        }
    },[ showBrandTable,showInventoryTable,showProductTable]);

    useEffect(() => {
        const axios = require('axios').default;
        const fetchProductData = async ()=>{ 
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/product`)
                .then((res: any)=>{
                    const data = res.data;
                    setProductData(data);
                    // console.log("productData: ",productData);
                })
                .catch((err: any) => {
                    console.error(err);
                })
        }
        fetchProductData();
        return ()=>{
            setProductData([]);
        }
    },[showProductTable,showInventoryTable]);

    useEffect(() => {
        const axios = require('axios').default;
        const fetchInventory = async ()=>{
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/inventory`)
                .then((res: any)=>{
                    const data = res.data;
                    setInventoryData(data);
                })
                .catch((err: any)=>{
                    console.error(err);
                })
        }
        fetchInventory();
        return ()=>{
            setInventoryData([]);
        }
    },[showInventoryTable]);
    
    return (
        <>
                <div>
                    <section>
                        <div className="dashboard-header">
                            <h1>Dashboard</h1>
                            <div>
                                <Icon icon={Menu} className="dashboard-header-menu-icon"/>
                            </div>
                        </div>
                        <div className="dashboard-curr-watch-container">
                            <CurrencyCard currType='USD'/>
                            <CurrencyCard currType='RWF'/>
                            <CurrencyCard currType='CNY'/>
                        </div>
                    </section>
                    <section>
                        <div className="dashboard-tables-show-panel">
                            <div className="dashboard-tables-show-panel-options">
                                <h2>Table</h2>
                                <ul>
                                    <li>
                                        <span onClick={onClickInventoryTableOption}>Inventory</span>
                                    </li>
                                    <li>
                                        <span onClick={onClickProductTableOption}>Product</span>
                                    </li>
                                    <li>
                                        <span onClick={onClickBrandTableOption}>Brand</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="tables-view">
                            {/* {showInventoryTable?<InventoryTable/>:null} */}
                            {showInventoryTable?
                                <Transition
                                    show={showInventoryTable}
                                >
                                <Transition.Child
                                    enter="transition-opacity ease-linear duration-800"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-800"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Table colHeaders={inventoryTableHeaders} inventoryData={inventoryData} 
                                    productData={productData} brandData={brandData} showInventoryTable={showInventoryTable}/>
                                </Transition.Child>
                            </Transition>
                            
                                
                            :null}
                            {showProductTable?
                            <Transition
                                    show={showProductTable}
                                >
                                    <Transition.Child
                                        enter="transition-opacity ease-linear duration-800"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity ease-linear duration-800"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Table colHeaders={productTableHeaders} productData={productData} showProductTable={showProductTable}/>
                                    </Transition.Child>
                            </Transition>
                                
                            :null}
                            {showBrandTable?
                            <Transition
                                    show={showBrandTable}
                                >
                                    <Transition.Child
                                        enter="transition-opacity ease-linear duration-800"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity ease-linear duration-800"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Table colHeaders={brandTableHeaders} brandData={brandData} showBrandTable={showBrandTable}/>
                                    </Transition.Child>
                            </Transition>
                                
                            :null}
                        </div>
                    </section>
                </div>
        </>
    )
}

export default DashboardHero
