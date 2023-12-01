import React, { useEffect } from "react";
import { isLogged } from "../../common/Auth";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = isLogged();
        if(!auth){
            navigate("/login");
        }
        else{
            navigate("/dashboard");
        }
    },[]);
    return(
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;