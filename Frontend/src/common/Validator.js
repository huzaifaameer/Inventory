import Swal from "sweetalert2";

export const ValidateEmptyValues = values => {
    if(values){
        let isValid = true;
        let errorField = "";
        for(let i in values){
            if(values[i] === ""){
                isValid = false;
                errorField = i;
                break;
            }
        }
        if(!isValid){
            Swal.fire(
                "No empty values",
                `Please enter a value in the "${errorField}" field.`,
                "error"
            )
        }
        else return true
    }
    else return false;
}