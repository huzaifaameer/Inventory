import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import Service from "../../Api";
import Loader from "../../components/Loader";
import { useParams } from 'react-router-dom';
import { ValidateEmptyValues } from "../../common/Validator";

function UpdateInventory(){
    const [ formValues, setFormValues ] = useState({
        material:"",
        quantity:"",
        buyPrice:"",
        expectedProducedUnits:"",
        expectedExpense:"",
        buyDate:"",
        actualProducedUnits:"",
        actualExpense:"",
        soldPrice:"",
        soldDate:""
    });
    const [ isLoader, setIsLoader ] = useState(true);
    const params = useParams();
    useEffect(()=>{
        Service.getInventory(params.inventoryId).then(res=>{
            setIsLoader(false);
            const data = res.data;
            setFormValues(data.record)
        }).catch(err=>{
            setIsLoader(false);
        })
    },[params]);

    const handleFormValues = e => {
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(ValidateEmptyValues(formValues)){
            setIsLoader(true);
            Service.updateInventory(formValues).then(res=>{
                setIsLoader(false);
                if(res.statusCode === 200){
                    Swal.fire(
                        "Success",
                        "Record added successfully.",
                        "success"
                    );
                }
                else{
                    Swal.fire(
                        "Error",
                        "Unable to add record.",
                        "error"
                    );
                }
                
            }).catch(err=>{
                setIsLoader(false);
                Swal.fire(
                    "Error",
                    "Unable to add record.",
                    "error"
                );
            });
        }
    }

    const { material, quantity, buyPrice, expectedProducedUnits, expectedExpense, buyDate, actualProducedUnits, actualExpense, soldPrice, soldDate } = formValues;
    return(
        <>
        {
            isLoader && (
                <Loader/>
            )
        }
        <div className="inventory screen-center">
            <div className="card m-width">
                <h5 className="light mb-4 clr-pr">Update inventory</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Material</label>
                                <input name="material" value={material} type="test" className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Quantity</label>
                                <input name="quantity" value={quantity} type="number" className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Buy Price</label>
                                <input name="buyPrice" value={buyPrice} type="number"  className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Buy date</label>
                                <input name="buyDate" value={buyDate} type="date"  className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Expected produced units</label>
                                <input name="expectedProducedUnits" value={expectedProducedUnits} type="number"  className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Expected expense</label>
                                <input name="expectedExpense" value={expectedExpense} type="number"  className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Actual produced units</label>
                                <input name="actualProducedUnits" value={actualProducedUnits} type="number"  className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Actual expense</label>
                                <input name="actualExpense" value={actualExpense} type="number"  className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Sold price</label>
                                <input name="soldPrice" value={soldPrice} type="number"  className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="form-group">
                                <label className="muted">Sold date</label>
                                <input name="soldDate" value={soldDate} type="date"  className="form-control" onChange={handleFormValues}/>
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="form-group">
                                <button className="btn btn-pr" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>        
        </>
    );
}

export default UpdateInventory;