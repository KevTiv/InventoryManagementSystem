import { useEffect, useState } from 'react';
import '../../Styles/Components/Table.scss';
import {brandsApiCallProps, productsApiCallProps} from '../Hero/DashboardHero';

type tableProps ={
    colHeaders ?: Array<string>,
    brandData ?: brandsApiCallProps[],
    showBrand ?: boolean,
    showProduct ?: boolean,
    showInventory ?: boolean
}
type brandDataProps ={
    brand_id: number,
    brand_name: string,
    industry: string,
    brand_country_of_origin: string,
    product_ref: string,
    product_name: string,
    product_brand_id: number,
    product_category: string,
    product_price: number
}

const Table = ({colHeaders, brandData, showBrand, showProduct, showInventory}:tableProps) => {
    
    const BrandDataRows = ({brandData}:tableProps)=>{
        return(
            <>
                {brandData && brandData.map((data:brandsApiCallProps)=>(
                    <tr key={1}>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-name-container ">
                                    <div>
                                        {data.brand_name}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-name-container ">
                                    <div>
                                        {data.industry}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="table-row-col">
                            <div className="table-row-col-img-container">
                                <div className="table-name-container ">
                                    <div>
                                        {data.brand_country_of_origin}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td
                        className="table-delete-container">
                        <a href="#">
                            Delete
                        </a>
                        </td>
                    </tr>
                ))}
            </>
        )
    }

    console.log("Data passed: ",brandData);
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
                                        {/* <th scope="col" className="table-header-name">
                                        Industry
                                        </th>
                                        <th scope="col" className="table-header-name">
                                        Country of origin
                                        </th> */}
                                        <th scope="col" className="table-header-del-option">
                                            <span>Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {showBrand? <BrandDataRows brandData={brandData}/>:null}
                                    
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