import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Navbar/Sidebar_App';
import Footer from '../../Components/Footer/Footer';
import DashboardHero from '../../Components/Hero/DashboardHero';
import ProductHero from '../../Components/Hero/ProductHero';
import InventoryHero from '../../Components/Hero/InventoryHero';
import BrandHero from '../../Components/Hero/BrandHero';
import '../../Styles/Views/Pages/DashboardPage.scss';
import { getYear } from '../../Utils/Dates/dateFunctions';

const Dashboard = () => {
    let navigate = useNavigate();
    const [currentYear, setCurrentYear] = useState<number>(0);
    
    const [showInventoryTable, setShowInventory] = useState<boolean>(true);
    const [showProductTable, setShowProduct] = useState<boolean>(false);
    const [showBrandTable, setShowBrand] = useState<boolean>(false);

    const [showDashboardComponent, setShowDashboardComponent] = useState<boolean>(true);
    const [showInventoryComponent, setShowInventoryComponent] = useState<boolean>(false);
    const [showProductComponent, setShowProductComponent] = useState<boolean>(false);
    const [showBrandComponent, setShowBrandComponent] = useState<boolean>(false);

    const onClickShowDashboardComponent = () => {
        setShowDashboardComponent(true);
        setShowInventoryComponent(false);
        setShowProductComponent(false);
        setShowBrandComponent(false);
    };
    const onClickShowProductComponent = () => {
        setShowDashboardComponent(false);
        setShowInventoryComponent(false);
        setShowProductComponent(true);
        setShowBrandComponent(false);
    };
    const onClickShowInventoryComponent = () => {
        setShowDashboardComponent(false);
        setShowInventoryComponent(true);
        setShowProductComponent(false);
        setShowBrandComponent(false);
    };
    const onClickShowBrandComponent = () => {
        setShowDashboardComponent(false);
        setShowInventoryComponent(false);
        setShowProductComponent(false);
        setShowBrandComponent(true);
    };

    const onClickInventoryTableOption = () =>{
        setShowInventory(true);
        setShowProduct(false);
        setShowBrand(false);
    };
    const onClickProductTableOption = () =>{
        setShowInventory(false);
        setShowProduct(true);
        setShowBrand(false);
    };
    const onClickBrandTableOption = () =>{
        setShowInventory(false);
        setShowProduct(false);
        setShowBrand(true);
    };
    useEffect(()=>{
        let authToken = sessionStorage.getItem('Auth Token');
        console.log("AUTH TOKEN:__",authToken)
        if (authToken) {
            navigate('/dashboard');
        };
        if (!authToken) {
            //sessionStorage.removeItem('Auth Token');
            sessionStorage.clear();
            navigate('/');
        };
        
        setCurrentYear(getYear);
    }, [navigate]);
    
    return (
        <>
            <div className="dashboard">
                <div className="sidebar">
                    <Sidebar onClickShowDashboardComponent={onClickShowDashboardComponent} onClickShowProductComponent={onClickShowProductComponent} 
                        onClickShowInventoryComponent={onClickShowInventoryComponent} onClickShowBrandComponent={onClickShowBrandComponent}/>
                </div>
                <div className="dashboard-body">
                    <div className="dashboard-header">

                    </div>
                    <div className="dashboard-hero">
                        {showDashboardComponent?
                            <Transition
                                show={showDashboardComponent}
                            >
                                <Transition.Child
                                    enter="transition-opacity ease-linear duration-800"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-800"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <DashboardHero
                                        showInventoryTable={showInventoryTable} showProductTable={showProductTable} showBrandTable={showBrandTable} 
                                        onClickInventoryTableOption={onClickInventoryTableOption} onClickProductTableOption={onClickProductTableOption} 
                                        onClickBrandTableOption={onClickBrandTableOption}/>
                                </Transition.Child>
                            </Transition>
                        :null}
                        {showInventoryComponent?
                            <Transition
                                show={showInventoryComponent}
                            >
                                <Transition.Child
                                    enter="transition-opacity ease-linear duration-800"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-800"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <InventoryHero/>
                                </Transition.Child>
                            </Transition>
                        :null}
                        {showProductComponent? 
                            <Transition
                                show={showProductComponent}
                            >
                                <Transition.Child
                                    enter="transition-opacity ease-linear duration-800"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-800"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <ProductHero/>
                                </Transition.Child>
                            </Transition>
                            
                        :null}
                        {showBrandComponent? 
                            <Transition
                                show={showBrandComponent}
                            >
                                <Transition.Child
                                    enter="transition-opacity ease-linear duration-800"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-800"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <BrandHero/>
                                </Transition.Child>
                            </Transition>
                        :null}
                    </div>
                    
                </div>
                <div className="dashboard-footer">
                    <Footer currentYear={currentYear}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard
