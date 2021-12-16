import React from 'react'
import { useFormik } from 'formik';

export const AddBrandForm = () => {
    const formik = useFormik({
        initialValues:{
            brandNameInput: '',              
            brandCountryOfOriginInput: '', 
            brandIndustryInput: '',                
            brandImgInput: '',               
        },onSubmit: values =>{
            alert(JSON.stringify(values, null, 2));

        }
    })
    return (
        <>
            <form className="w-72" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="brandNameInput">Name</label>
                    <input
                        id="brandNameInput"
                        name="brandNameInput"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.brandNameInput}
                    />

                    <label htmlFor="brandCountryOfOriginInput">Country of origin</label>
                    <input
                        id="brandCountryOfOriginInput"
                        name="brandCountryOfOriginInput"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.brandCountryOfOriginInput}
                    />

                    <label htmlFor="brandIndustryInput">Industry</label>
                    <input
                        id="brandIndustryInput"
                        name="brandIndustryInput"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.brandIndustryInput}
                    />

                    <label htmlFor="brandImgInput">Image file</label>
                    <input
                        id="brandImgInput"
                        name="brandImgInput"
                        type="file"
                        onChange={formik.handleChange}
                        value={formik.values.brandImgInput}
                    />
                </div>
                <div className="flex align-center justify-center">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}
