'use client'
import {  ArrowUpWideNarrowIcon, BadgeDollarSignIcon, BadgeInfoIcon, BarChart3, Barcode, CalendarCheck, ChevronsUpDown, Coins, Contact, ContainerIcon, Crown,  DiamondPercentIcon,  Handshake, HandshakeIcon, LandPlot, Layers2Icon, Settings, ShoppingCartIcon, User, User2Icon, UsersRoundIcon, WaypointsIcon } from "lucide-react";
import Link from "next/link";
import './side-bar.css'
import { memo, useCallback, useEffect, useState } from "react";
import { Mountains_of_Christmas } from "next/font/google";
import innerWidth from "@/hooks/useIsMobile";


interface ISideBar {
    btnList: IBtn[]
} 

type IBtn = {
    title: string
    Icon: React.ReactNode
}

const list = [
   {
    title: 'Vender',
    Icon: (<HandshakeIcon strokeWidth={1} size={18}/>),
    link: "/dashboard/sell"
   },
   {
    title: 'Operacional',
    Icon: (<Layers2Icon strokeWidth={1} size={18}/>),
    link: "/dashboard/coutyard"
   },
   {
    title: 'Colaboradores',
    Icon: (<UsersRoundIcon strokeWidth={1} size={18}/>),
    link: "/dashboard/staff"
   },
   {
    title: 'Marketing',
    Icon: (<WaypointsIcon strokeWidth={1} size={18}/>),
    link: "/dashboard/marketing"
   },
   {
    title: 'Financeiro',
    Icon: (<Coins strokeWidth={1} size={18}/>),
    link: "/dashboard/finance"
   },
   {
    title: 'Produtos',
    Icon: (<Barcode strokeWidth={1} size={18}/>),
    link: "/dashboard/products"
   },
   {
    title: 'Clientes',
    Icon: (<Contact strokeWidth={1} size={18}/>),
    link: "/dashboard/customers"
   },
   {
    title: 'Prestadores e fornecedores',
    Icon: (<ContainerIcon strokeWidth={1} size={18}/>),
    link: "/dashboard/suppliers"
   },
   {
    title: 'Calendário',
    Icon: (<CalendarCheck strokeWidth={1} size={18}/>),
    link: "/dashboard/calendar"
   },
   {
    title: 'Relatórios',
    Icon: (<BarChart3 strokeWidth={1} size={18}/>),
    link: "/dashboard/report"
   }
   ,
   {
    title: 'Configuração',
    Icon: ( <Settings strokeWidth={1} size={18}/>),
    link: "/dashboard/settings"
   },
   {
    title: 'Crédito para crescer',
    Icon: (<ArrowUpWideNarrowIcon strokeWidth={1} size={18}/>),
    link: "/dashboard/grow-up"
   },
   {
    title: 'E-store',
    Icon: (<ShoppingCartIcon strokeWidth={1} size={18}/>),
    link: "/dashboard/e-store"
   },
   {
    title: 'Chamadas de suporte',
    Icon: (<BadgeInfoIcon strokeWidth={1} size={18}/>),
    link: "/dashboard/suport-ticket"
   },
   {
    title: 'Certificado Digital',
    Icon: (<LandPlot strokeWidth={1} size={18}/>),
    link: "/dashboard/account"
   },
   {
    title: 'Certificado Digital',
    Icon: (<LandPlot strokeWidth={1} size={18}/>),
    link: "/dashboard/account"
   },
   {
    title: 'Certificado Digital',
    Icon: (<LandPlot strokeWidth={1} size={18}/>),
    link: "/dashboard/account"
   },
   {
    title: 'Certificado Digital',
    Icon: (<LandPlot strokeWidth={1} size={18}/>),
    link: "/dashboard/account"
   }
]

const side: ISideBar = {
    btnList: list
}

const SideBar = memo(({isVisibleTitle}:{isVisibleTitle: boolean}) => {

    const Width = innerWidth();

    return (
        <section  className={` max-w-[280px] min-w-[280px] ${Width <= 768 ? "hidden" : "flex"} flex-col mt-0 bg-white h-full border-r`}>
            <div  className=" h-full  flex flex-col  overflow-x-hidden ">
                <div className=" flex flex-col justify-start bg-red-0 text-sm whitespace-nowrap  h-[calc(100%-40px)] overflow-scroll  scroll-v py-2 ">
                    <div className="h-full w-full p-[2px] pl-5">
                    {
                        list.map((i, index) => {
                            let idx = list.length - 1 
                            return (
                                <>
                                    <Link href={`${i.link}`}  key={index} className="w-min  h-10 text-zinc-700 flex flex-row  hover:bg-zinc-200  rounded  gap-2 items-center">
                                        <div about='icone' className="w-10 h-10  h-full flex items-center justify-center">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> */}
                                            {i.Icon}
                                        </div>
                                        <p className={`h-full flex min-w-[200px] items-center ${isVisibleTitle ? "flex" :  'flex'}`}>
                                            {i.title}
                                        </p>
                                    </Link>
                                    {
                                        index === list.length - 1 ? 
                                            <div className="p-5 h-min text-xs">
                                                <div className=" text-gray-600 bg-gray-100 text- p-3">
                                                    <Link href={''} className="hover:underline">Suporte Ténico</Link>
                                                    <Link href={''} className="flex gap-2 items-center">Vsersion 1.23.3 <div className="w-min px-1 border border-gray-400">beta</div></Link>
                                                </div>
                                            </div> 
                                            : 
                                            <></>
                                    }
                                </>
                            )
                        })
                    }
                    </div>
                </div>
                <div className={`h-10 border-t w-full flex bg-white items-center `}>
                    <Link href="/dashboard/account" className="w-full  h-full text-zinc-700 flex flex-row hover:bg-zinc-200 rounded  gap-2 items-center">
                        <div about='icone' className="w-10 h-10  h-full w-full flex items-center justify-center">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> */}
                            <User2Icon size={18} strokeWidth="1"/>
                        </div>
                        <div className={`${isVisibleTitle ? "flex" : "flex"} gap-2  w-full`}>
                            <p className="text-sm font-semibold truncate hover:text-blue-600">
                                Mateus Limeira
                            </p>
                            <ChevronsUpDown
                                strokeWidth={1}
                                size={18}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
})


/** 
 
 Criar page/screen Cadastro de Clientes 

 Informações: Nome, cpf, endereço, data de nascimento, 
 email, telefones, data de entrada na plataforma, 
 situação do cliente, veículos, (Razão social, 
 ome fantasia, endereço e CNPJ se for empresa)

 Essa página vai conter a lista de clientes e um botão 
 "Cadastrar cliente".

 Criar a page/screen na pasta templates. Deve conter um 
 formulário para coletar as informações. 

 Utilizar:
 
    Tailwind (bibioteca de estilização)
    React-hook-form (bibioteca para validação de formulaŕio)
    React Bootstrap (bibioteca de components, opcional)
    Lucide (bibioteca de ícones)

 Lançar a funcionalidade na ramificação "feature" no Github.


 */


 export default SideBar

// reduzi em 35% o tempo de renderização. uma redução de 29ms.