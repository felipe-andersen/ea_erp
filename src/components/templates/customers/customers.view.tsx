'use client'
import { Header } from "@/components/organisms/header";
import SideBar from "@/components/organisms/side-bar/side-bar.view";
import Content from "./content.view";


export function Customers() {
    return (
        
        <div 
            className="w-full h-full flex flex-col"
            data-testid="services-template"
        >
            <Header pageName="ORM"/>
              <div className="flex bg-neutral-100 w-full h-[calc(100vh-48px)]">
                <SideBar isVisibleTitle/>
                <Content />
            </div>
            
        </div>
    )
}

export default Customers