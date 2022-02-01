import React, { useEffect, useState } from 'react'

type cardProps={
    currType: string
}

const getCurrency = (fromCurr:string, toCurr:string, setCurrency:React.Dispatch<React.SetStateAction<number>> )=>{
    const axios = require("axios").default;
    
    let options = {
        method: 'GET',
        url: process.env.REACT_APP_CURR_EXCH_RAPIDAPI_URL,
        params: {to: `${toCurr}`, from: `${fromCurr}`, q: '1.0'},
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_CURR_EXCH_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_CURR_EXCH_RAPIDAPI_KEY
        }
    };

    axios.request(options).then(async (res:any)=>{
        console.log(res.data);
        setCurrency(res.data.toFixed(2));
    }).catch(async (err:any)=> {
        console.error(err);
        // setCurrency(err);
    });
};

const CurrencyCard = ({currType}:cardProps) => {
    const [eurToUsd, setEurToUsd] = useState<number>(0);
    const [eurToCny, setEurToCny] = useState<number>(0);
    const [eurToRwf, setEurToRwf] = useState<number>(0);
    useEffect(() => {
        getCurrency('EUR','USD',setEurToUsd);
        getCurrency('EUR','CNY',setEurToCny);
        getCurrency('EUR','RWF',setEurToRwf);
    },[]);
    if (currType === 'USD'){
        
        return (
            <>
                <div className="currency-container">
                    <div className="currency-body">
                        <div className="currency-body-eur">
                            1 EUR
                        </div>
                        <div className="currency-body-conversion">
                            {eurToUsd} {currType}
                            {/* {currencyConversionRate.substring(0,6)} {currType} */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    if (currType === 'CNY'){
        return (
            <>
                <div className="currency-container">
                    <div className="currency-body">
                        <div className="currency-body-eur">
                            1 EUR
                        </div>
                        <div className="currency-body-conversion">
                            {eurToCny} {currType}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    if (currType === 'RWF'){
        return (
            <>
                <div className="currency-container">
                    <div className="currency-body">
                        <div className="currency-body-eur">
                            1 EUR
                        </div>
                        <div className="currency-body-conversion">
                            {eurToRwf} {currType}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return(
        <></>
    )
}

export default CurrencyCard
