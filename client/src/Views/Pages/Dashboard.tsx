import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Navbar/Sidebar_App';
import Footer from '../../Components/Footer/Footer';
import DashboardHero from '../../Components/Hero/DashboardHero';
import ProductHero from '../../Components/Hero/ProductHero';
import InventoryHero from '../../Components/Hero/InventoryHero';
import BrandHero from '../../Components/Hero/BrandHero';
import '../../Styles/Views/Pages/DashboardPage.scss';
import { appCheck } from '../../Utils/Firebase/firebase';
//import {appCheck} from '../../Utils/Firebase/firebase';

const Dashboard = () => {
    let navigate = useNavigate();
    const [EurToUsd, setEurToUsd] = useState<string>('');
    const [EurToRwf, setEurToRwf] = useState<string>('');
    const [EurToYuan, setEurToYuan] = useState<string>('');
    
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
    }, [navigate]);
    useEffect(() => {
        const GreCaptchatoken = appCheck;
        console.log('GreCaptchatoken', GreCaptchatoken)
    });
    
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
                            <DashboardHero EurToUsd={EurToUsd} EurToRwf={EurToRwf} EurToYuan={EurToYuan}
                                showInventoryTable={showInventoryTable} showProductTable={showProductTable} showBrandTable={showBrandTable} 
                                onClickInventoryTableOption={onClickInventoryTableOption} onClickProductTableOption={onClickProductTableOption} 
                                onClickBrandTableOption={onClickBrandTableOption}/>
                        :null}
                        {showInventoryComponent?
                            <InventoryHero/>
                        :null}
                        {showProductComponent? 
                            <ProductHero/>
                        :null}
                        {showBrandComponent? 
                            <BrandHero/>
                        :null}
                    </div>
                    
                </div>
                <div className="dashboard-footer">
                    <Footer currentYear={2021}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard
