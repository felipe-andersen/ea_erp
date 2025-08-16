'use client'
import { Header } from "@/components/organisms/header";
import SideBar from "@/components/organisms/side-bar/side-bar.view";
import Content from "./content.view";


export function CreateExperience() {
    return (
        
        <div 
            className="w-full h-full overflow-hidden flex flex-col"
            data-testid="services-template"
        >
            <Header pageName="ORM"/>
            <div className="flex h-[calc(100vh-48px)] bg-neutral-100 w-full">
                <SideBar isVisibleTitle/>
                <Content />
            </div>
            
        </div>
    )
}

export default CreateExperience