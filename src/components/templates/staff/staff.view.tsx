import { Header } from "@/components/organisms/header";
import { Main } from "./content.view.";
import SideBar from "@/components/organisms/side-bar/side-bar.view";


export function Staff() {
    return (
        <div className="w-screen h-full flex flex-col ">
            <Header pageName="ERP"/>
            <div className="flex bg-neutral-100 w-full h-[calc(100vh-48px)]">
                <SideBar isVisibleTitle/>
                 <Main />
            </div>
        </div>
    )
}