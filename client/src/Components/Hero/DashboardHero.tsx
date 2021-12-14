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
const DashboardHero = (
    {EurToUsd, EurToRwf, EurToYuan, showInventory, 
        showProduct, showBrand, onClickInventory, 
        onClickProduct, onClickBrand}:dashboardProps) => {

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
                        {showProduct?<ProductTable/>:null}
                        {showBrand?<BrandTable/>:null}
                    </div>
                    <div>
                        <Table/>
                    </div>
                </section>
            </div>
        </>
    )
}

export default DashboardHero
