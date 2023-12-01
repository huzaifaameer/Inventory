import React, { useEffect } from "react";

function Dashboard(){
    return(
        <div>
            <h3 className="light clr-pr mb-4">Dashboard</h3>
            <div className="row">
                <div className="col-9">
                    <div className="card">
                        <img width="100%" src="https://www.buffalo.edu/content/www/brand/creative/graphic-elements/charts/_jcr_content/par/image_3.img.original.png/1458252610105.png"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card mb-3">
                        <img width="100%" src="https://cdn.analyticsvidhya.com/wp-content/uploads/2021/02/Donut_Chart_Tableau_2.png"/>
                    </div>
                    <div className="card">
                        <img width="100%" src="https://i0.wp.com/m.signalvnoise.com/wp-content/uploads/2016/11/1WHWgunF4YqyHfWDEWCypEA.png?w=640&ssl=1"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;