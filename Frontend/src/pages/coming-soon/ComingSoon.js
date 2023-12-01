import React from "react";
import { Link } from "react-router-dom";

function ComingSoon(){
    return(
        <div className="element-center">
            <div className="card m-width">
                <h1 className="light clr-pr">Coming soon</h1>
                <p className="mb-4">The feature is under development.</p>
                <Link className="btn btn-pr">Take me back</Link>
            </div>
        </div>
    );
}

export default ComingSoon;