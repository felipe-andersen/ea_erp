import { Header } from "@/components/organisms/header";
import Content from "./content.view";
import SideBar from "@/components/organisms/side-bar/side-bar.view";


export default function Operational() {
    return (
        <div className="flex flex-col w-full">
            <Header pageName="ERP" />
            <div className="flex h-full bg-neutral-100 w-full">
                <SideBar isVisibleTitle/>
                <Content />
            </div>
        </div>
    )
}