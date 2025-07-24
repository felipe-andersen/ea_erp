'use client'
import { Header } from "@/components/organisms/header";
import SideBar from "@/components/organisms/side-bar/side-bar.view";
import Content from "./marketing-content.view";


export function Marketing() {
    return (
        
        <div 
            className=" w-[100vw] h-[100vh] overflow-hidden"
            data-testid="services-template"
        >
            <Header pageName="ORM"/>
              <div className="flex h-[calc(100%-56px)] fixed bg-neutral-100 w-full mt-14">
                <SideBar isVisibleTitle/>
                <Content />
            </div>
            
        </div>
    )
}

export default Marketing
