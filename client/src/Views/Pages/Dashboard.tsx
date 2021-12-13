import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Navbar/Sidebar_App';
import Footer from '../../Components/Footer/Footer';
import DashboardHero from '../../Components/Hero/DashboardHero';
import ProductHero from '../../Components/Hero/ProductHero';
import InventoryHero from '../../Components/Hero/InventoryHero';
import BrandHero from '../../Components/Hero/BrandHero';
import '../../Styles/Views/Pages/DashboardPage.scss';

const Dashboard = () => {
    let navigate = useNavigate();
    const [EurToUsd, setEurToUsd] = useState<string>('');
    const [EurToRwf, setEurToRwf] = useState<string>('');
    const [EurToYuan, setEurToYuan] = useState<string>('');
    
    const [showInventory, setShowInventory] = useState<boolean>(true);
    const [showProduct, setShowProduct] = useState<boolean>(false);
    const [showBrand, setShowBrand] = useState<boolean>(false);

    const onClickInventory = () =>{
        setShowInventory(true);
        setShowProduct(false);
        setShowBrand(false);
    }
    const onClickProduct = () =>{
        setShowInventory(false);
        setShowProduct(true);
        setShowBrand(false);
    }
    const onClickBrand = () =>{
        setShowInventory(false);
        setShowProduct(false);
        setShowBrand(true);
    }
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

        // const axios = require('axios');
        // const getCurrencyRateFixerIO = async ()=>{
        //     await axios.get('http://data.fixer.io/api/2013-12-24',{
        //         params: {
        //             access_key: process.env.REACT_APP_FIXERIO_API_KEY,
        //             symbols: 'USD,CNY,RWF'
        //         }
        //     }).then( await function(res: any) {
        //         console.log(res);
        //         // const result = JSON.stringify(res);
        //         setEurToUsd(JSON.stringify(res.data.rates.USD));
        //         setEurToRwf(JSON.stringify(res.data.rates.RWF));
        //         setEurToYuan(JSON.stringify(res.data.rates.CNY));
        //         console.log('USD: ',EurToUsd,' RWF: ', EurToRwf, ' CNY: ',EurToYuan)
                
        //     }).catch(function(err: any){
        //         console.error(err);
        //     })
        // }
        // getCurrencyRateFixerIO();
            
    }, [navigate])

    return (
        <>
            <div className="dashboard">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="dashboard-body">
                    <div className="dashboard-header">

                    </div>
                    <div className="dasboard-hero">
                        <DashboardHero EurToUsd={EurToUsd} EurToRwf={EurToRwf} EurToYuan={EurToYuan}
                            showInventory={showInventory} showProduct={showProduct} showBrand={showBrand} 
                            onClickInventory={onClickInventory} onClickProduct={onClickProduct} onClickBrand={onClickBrand}/>
                        <ProductHero/>
                        <InventoryHero/>
                        <BrandHero/>
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
