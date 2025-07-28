import { Header } from "@/components/organisms/header";
import SideBar from "@/components/organisms/side-bar/side-bar.view";
import Content from "./content.view";


export default function Suppliers() {
    return (
        <div>
            <Header />
            <div className="flex h-[calc(100%-56px)] fixed bg-neutral-100 w-full mt-14">
                <SideBar isVisibleTitle/>
                <Content/>
            </div>
        </div>
    )
}