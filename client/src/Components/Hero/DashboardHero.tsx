import { useEffect, useState } from 'react';
import CurrencyCard from '../Cards/CurrencyCard';
import {Icon} from '@iconify/react';
import Menu from '@iconify/icons-dashicons/menu';

import InventoryTable from '../Table/InventoryTable';
import ProductTable from '../Table/ProductTable';
import BrandTable from '../Table/BrandTable';
import Table from '../Table/Table';

type dashboardProps={
    EurToUsd: string,
    EurToRwf: string, 
    EurToYuan: string, 
    showInventory: boolean,
    showProduct: boolean,
    showBrand: boolean,
    onClickInventory: () => void,
    onClickProduct: () => void,
    onClickBrand: () => void
}
export type brandsApiCallProps ={
    brand_id: number,
    brand_name: string,
    brand_country_of_origin: string,
    industry: string,
    date_created: Date,
}
export type productsApiCallProps ={
    product_ref: string,
    product_name: string,
    product_brand_id: number,
    product_category: string,
    product_price: number
}
const DashboardHero = (
    {EurToUsd, EurToRwf, EurToYuan, showInventory, 
        showProduct, showBrand, onClickInventory, 
        onClickProduct, onClickBrand}:dashboardProps) => {
    const brandTableHeaders:string[] = ["Name", "Industry", "Country Of Origin"];
    const productTableHeaders: string[] = ["Reference", "Name", "Brand", "Category", "Price"];
    const [brandData, setBrandData] = useState<brandsApiCallProps[]>();
    const [productData, setProductData] = useState<productsApiCallProps[]>();
    useEffect(() => {
        const axios = require('axios').default;

        const fetchBrandData = async ()=>{ 
            await axios.get('http://localhost:8080/api/brand')
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
    },[showBrand])
    useEffect(() => {
        const axios = require('axios').default;
        const fetchProductData = async ()=>{ 
            await axios.get('http://localhost:8080/api/product')
                .then((res: any)=>{
                    const data = res.data;
                    setProductData(data);
                    //console.log("productData: ",productData);
                })
                .catch((err: any) => {
                    console.error(err);
                })
        }
        fetchProductData();
    },[showProduct])
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
                        <CurrencyCard currencyConversionRate={EurToUsd} currType='USD'/>
                        <CurrencyCard currencyConversionRate={EurToRwf} currType='RWF'/>
                        <CurrencyCard currencyConversionRate={EurToYuan} currType='CNY'/>
                    </div>
                </section>
                <section>
                    <div className="dashboard-tables-show-panel">
                        <div className="dashboard-tables-show-panel-options">
                            <h2>Table</h2>
                            <ul>
                                <li>
                                    <span onClick={onClickInventory}>Inventory</span>
                                </li>
                                <li>
                                    <span onClick={onClickProduct}>Product</span>
                                </li>
                                <li>
                                    <span onClick={onClickBrand}>Brand</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="tables-view">
                        {showInventory?<InventoryTable/>:null}
                        {/* {showProduct?
                            <Table colHeaders={productTableHeaders} tableData={productData} showProduct={showProduct}/>
                        :null} */}
                        {showBrand?
                            <Table colHeaders={brandTableHeaders} brandData={brandData} showBrand={showBrand}/>
                        :null}
                    </div>
                </section>
            </div>
        </>
    )
}

export default DashboardHero
