import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-fluent/delete-48-filled';
import '../../Styles/Components/Table.scss';
import {brandsAPICallProps, productsAPICallProps, inventoryAPICallProps} from '../Hero/DashboardHero';
import { JsxElement } from 'typescript';

type tableProps ={
    colHeaders ?: Array<string>,
    brandData ?: brandsAPICallProps[],
    productData ?: productsAPICallProps[],
    inventoryData ?: inventoryAPICallProps[],
    showBrandTable ?: boolean,
    showProductTable ?: boolean,
    showInventoryTable ?: boolean,
}

const Table = ({colHeaders, brandData, productData, inventoryData, showBrandTable, showProductTable, showInventoryTable}:tableProps) => {
    
    const BrandDataRows = ({brandData}:tableProps)=>{
        return(
            <>
                {brandData && brandData.map((data:brandsAPICallProps)=>(
                    <tr key={data.brand_id}>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.brand_name}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.industry}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.brand_country_of_origin}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td
                        className="table-delete-container">
                        <a href="#">
                            <Icon icon={deleteIcon} />
                        </a>
                        </td>
                    </tr>
                ))}
            </>
        )
    }
    const InventoryDataRows = ({inventoryData}:tableProps)=>{
        return(
            <>
                {inventoryData && inventoryData.map((data:inventoryAPICallProps)=>(
                    <tr key={data.product_id}>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.product_id}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.product_brand_id}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.inventory_quantity}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.inventory_price}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.last_updated}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td
                        className="table-delete-container ">
                            <a href="#">
                                <Icon icon={deleteIcon} />
                            </a>
                        </td>
                    </tr>
                ))}
            </>
        )
    }
    const ProductDataRows = ({productData}:tableProps)=>{
        return(
            <>
                {productData && productData.map((data:productsAPICallProps)=>(
                    <tr key={data.product_id}>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.product_ref}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.product_name}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.product_brand_id}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.product_category}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-row-text-container">
                                    <div>
                                        {data.product_price}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td
                        className="table-delete-container ">
                            <a href="#">
                                <Icon icon={deleteIcon} />
                            </a>
                        </td>
                    </tr>
                ))}
            </>
        )
    }
    return (
        <>
            <div className="table">
                <div className="table-container">
                    <div className="table-wrapper">
                        <div className="table-wrapper-body">
                            <table className="table-body ">
                                <thead className="table-header-body">
                                    <tr>
                                        {colHeaders&&colHeaders.map((header) =>(
                                            <th scope="col" className="table-header-name">
                                                {header}
                                            </th>
                                            )
                                        )}
                                        <th scope="col" className="table-header-del-option">
                                            <span>Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {showInventoryTable ? <InventoryDataRows inventoryData={inventoryData}/>:null}
                                    {showProductTable ? <ProductDataRows productData={productData}/>:null}
                                    {showBrandTable? <BrandDataRows brandData={brandData}/>:null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table