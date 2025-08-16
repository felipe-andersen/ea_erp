'use client'
import { Header } from "@/components/organisms/header";
import { Content } from "./content.view";
import SideBar from "@/components/organisms/side-bar/side-bar.view";


export function Ticket() {
    return (
        <div 
            className="flex flex-col w-full h-full overflow-hidden"
            data-testid="services-template"
        >
            <Header pageName="ORM"/>
            <div className="flex h-[calc(100vh-48px)] bg-neutral-100 w-full">
                <SideBar isVisibleTitle/>
                <Content/>
            </div>
        </div>
    )
}

