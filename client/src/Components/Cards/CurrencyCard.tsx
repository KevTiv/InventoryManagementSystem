import React from 'react'

type cardProps={
    currencyConversionRate: string,
    currType: string
}
const CurrencyCard = ({currencyConversionRate, currType}:cardProps) => {
    if (currType === 'USD'){
        return (
            <>
                <div className="currency-container">
                    <div className="currency-body">
                        <div className="currency-body-eur">
                            1 EUR
                        </div>
                        <div className="currency-body-conversion">
                            {currencyConversionRate.substring(0,6)} {currType}
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
                            {currencyConversionRate.substring(0,6)} {currType}
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
                            {currencyConversionRate.substring(0,6)} {currType}
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
