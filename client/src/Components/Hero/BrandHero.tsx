import { AddBrandForm } from "../Forms/AddBrandForm"

const BrandHero = () => {
    return (
        <>
            <h1>
                Brand
            </h1>
            <div className="brand-hero-container">
                <div className="brand-add-container">
                    <AddBrandForm/>
                </div>
            </div>
        </>
    )
}

export default BrandHero
