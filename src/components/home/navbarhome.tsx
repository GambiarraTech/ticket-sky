import React from "react";

interface ApplicationLayoutProps {
    children: React.ReactNode
}


const NavBar: React.FC<ApplicationLayoutProps> = ({ children }) => {
    let Links = [
        { name: "ENTRAR", link: "/" },
        { name: "CADASTRAR", link: "/" }];
    return (
        <>
        <div className="shadow-md w-full fixed top-0 left-0">
            <div className="md:flex items-center justify-between bg-azulBalanço">
                <div>
                    <span>
                        <img className="h-28" src="./images/logoTS1.png" alt="logoNavBar" />
                    </span>
                </div>
                <ul className="md:flex md:items-right text-white px-7">
                    {
                        Links.map((link) => (
                            <li key={link.name} className="md:ml-8 text-x1">
                                <a style={{ color: "white" }}
                                 href={link.link}>{link.name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
        <div style={{width:"100%"}}>
        {children}
    </div>  
    </>);
        
}


export default NavBar;

