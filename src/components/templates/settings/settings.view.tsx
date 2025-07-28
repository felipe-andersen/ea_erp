import { Header } from "@/components/organisms/header";
import { Main } from "./content.view";
import SideBar from "@/components/organisms/side-bar/side-bar.view";


export default function Settings() {
    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <div className="flex h-[calc(100vh-56px)] bg-neutral-100 w-full">
                <SideBar isVisibleTitle/>
                <Main/>
            </div>
            
        </div>
    )
}