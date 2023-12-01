import React, {useState, useEffect} from "react";
import "./Inventory.css";
import Swal from "sweetalert2";
import Service from "../../Api";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import ReactDatatable from '@ashvin27/react-datatable';

function Inventory(){
    const [ isLoader, setIsLoader ] = useState(true);
    const [ inventoryItems, setInventoryItems ] = useState([]);
    const Config = {
        show_length_menu: false,
        show_filter: true,
        show_pagination: true,
        show_info:true
    };
    const Columns = [
        {
            text: 'Material',
            key: 'material',
            sortable: false,
            width:"15%"
        },
        {
            text: 'Quantity',
            key: 'quantity',
            sortable: false,
        },
        {
            text: 'Buy price',
            key: 'buyPrice',
            sortable: false,
        },
        {
            text: 'Buy date',
            key: 'buyDate',
            sortable: false,
            width:"15%"
        },
        {
            text: 'Expected product units',
            key: 'expectedProducedUnits',
            sortable: false,
        },
        {
            text: 'Expected expense',
            key: 'expectedExpense',
            sortable: false,
        },
        {
            text: 'Actual produced units',
            key: 'actualProducedUnits',
            sortable: false,
        },
        {
            text: 'Actual expense',
            key: 'actualExpense',
            sortable: false,
        },
        {
            text: 'Sold price',
            key: 'soldPrice',
            sortable: false,
        },
        {
            text: 'Sold date',
            key: 'soldDate',
            sortable: false,
        },
        {
            text: 'Created date',
            key: 'createdDate',
            sortable: false,
            width:"15%"
        },
        {
            text: 'View',
            key: '_id',
            sortable: false,
            // cell: (data, i) => (
            //     <button className="btn-unstyled view-button">
            //         <span class="material-symbols-outlined">visibility</span>
            //     </button>
            // )
            cell: (data, i) => (
                <Link to={`/getinventory/${data._id}`} className="btn-unstyled view-button">
                    <span class="material-symbols-outlined">visibility</span>
                </Link>
            )
        },
    ];
    useEffect(()=>{
        Service.getInventoryList().then(res=>{
            setIsLoader(false);
            if(res.statusCode === 200){
                setInventoryItems(res.data.records);
            }
        }).catch(err=>{
            setIsLoader(false);
        })
    },[]);

    return(
        <>
        <h3 className="light clr-pr mb-4">Inventory list</h3>
        {
            isLoader && (
                <Loader/>
            )
        }
        {
            inventoryItems.length ?
            <div className="">
                <ReactDatatable 
                    columns={Columns}
                    config={Config}
                    records={inventoryItems}
                />
            </div>
            :
            <div>
                <h5 className="normal">Fetching results...</h5>
            </div>
        }
        </>
    );
}

export default Inventory;