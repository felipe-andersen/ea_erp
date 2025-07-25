'use client'
import { Header } from "@/components/organisms/header";
import { Main } from "./main.view";
import SideBar from "@/components/organisms/side-bar/side-bar.view";


export function ServicesList() {
    return (
        
        <div 
            className=" w-[100vw] h-[100vh] overflow-hidden"
            data-testid="services-template"
        >
            <Header pageName="ORM"/>
              <div className="flex h-[calc(100%-56px)] fixed bg-neutral-100 w-full mt-14">
                <SideBar isVisibleTitle/>
                <Main/>
            </div>
            
        </div>
    )
}

