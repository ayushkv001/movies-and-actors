import React from "react";
import Nav from "./Nav";
import Title from "./Title";

const MainPageLayout = ({children}) => {
    return <div>
        <Title  title="BOX Office" subtitle={"Are you looking for a movie?"}/>
        <Nav/>
        
        {children}
    </div>
}

export default MainPageLayout;