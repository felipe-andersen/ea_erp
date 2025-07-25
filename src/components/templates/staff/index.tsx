import { Header } from "@/components/organisms/header";
import { Main } from "./main";
import SideBar from "@/components/organisms/side-bar/side-bar.view";


export function Staff() {
    return (
        <div className="w-full h-[100vh] w-[100vw] overflow-hidden">
            <Header pageName="ERP"/>
            <div className="flex h-[calc(100%-56px)] fixed bg-neutral-100 w-full mt-14">
                <SideBar isVisibleTitle/>
                 <Main />
            </div>
        </div>
    )
}