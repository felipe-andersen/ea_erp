import { Header } from "@/components/organisms/header";
import Content from "./content.view";
import SideBar from "@/components/organisms/side-bar/side-bar.view";


export default function Operational() {
    return (
        <>
            <Header pageName="ERP" />
            <div className="flex h-[calc(100%-56px)] fixed bg-neutral-100 w-full mt-14">
                <SideBar isVisibleTitle/>
                <Content />
            </div>
        </>
    )
}