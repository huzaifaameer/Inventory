import { SpinnerDotted } from "spinners-react";

function Loader(){
    return(
        <div style={{position:"fixed",inset:"0px", display:"grid", placeItems:"center", backgroundColor:"#fff6", zIndex:"9999999"}}>
            <SpinnerDotted size={150} thickness={100} speed={100} color="var(--clr-pr)" />
        </div>
    )
}

export default Loader;