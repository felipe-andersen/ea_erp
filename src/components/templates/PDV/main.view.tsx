'use client'
import { ArrowBigRight, ArrowRightIcon, ArrowUpRight, ArrowUpRightIcon, ChevronLeft, ChevronRight, Circle, EllipsisIcon, HelpCircle, LifeBuoy, Link2, Maximize2, PenTool, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { NewSale } from "@/components/organisms/forms/newSale";
import { useState } from "react";
import { Modal } from "@/components/organisms/modal/modal.view";


export function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <main className="w-full h-full mt-16 p-3 sm:p-6 bg-white bg-[#f6f8fa]  top-16 bottom-16 flex flex-col gap-5 overflow-y-scroll">
            {
                 <Modal
                    onClose={setIsModalOpen}
                    isOpen={isModalOpen}
                >
                    <NewSale
                        setShowModal={setIsModalOpen}
                    />
                </Modal>
            }
            {/* <div className="h-16 w-full flex items-center justify-between gap-5">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-teal-500 border-[2px] border-transparent hover:border-teal-500 hover:bg-teal-400 text-white h-9 px-3 rounded font-semibold text-sm whitespace-nowrap"
                    >
                        Nova venda
                    </button>
                    <button className="bg-neutral-300 border-[2px] border-transparent  hover:bg-neutral-200 text-neutral-900 h-9 px-3 rounded font-semibold text-sm whitespace-nowrap">
                        Novo orçamento
                    </button>
                    <button className=" flex gap-2 items-center hover:bg-zinc-200  h-9 px-3 rounded font-semibold text-sm whitespace-nowrap">
                        <ArrowUpRightIcon size={18} />
                        Consultar ordem de serviço
                    </button>
                </div>
                <div className="flex gap-2 items-center">
                    <button className=" flex gap-2 items-center hover:bg-zinc-200  h-10 px-3 rounded font-semibold text-sm">
                        <LifeBuoy size={20}/>
                    </button>
                    <button className=" flex gap-2 items-center bg-white hover:bg-zinc-200 border border-zinc-200 h-10 px-3 rounded font-semibold text-sm ">
                        Apurar caixa
                    </button>
                    <button className=" flex gap-2 bg-white items-center hover:bg-zinc-200 border border-zinc-200 h-10 px-3 rounded font-semibold text-sm">
                        Fechar caixa
                    </button>
                </div>
            </div> */}
            <div className="flex gap-5 w-full h-full flex-col">

            <div className=" w-full h-80   flex flex-col  sm:flex-start gap-5 p-5  h-full ">
                    <span className="flex flex-col gap-2 w-full">
                        <h3 className="font-semibold text-lg">
                            Vendas
                        </h3>
                        <p className="text-neutral-600">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
                        </p>
                    </span>
                    {/* <div className="flex gap-2">
                        <EllipsisIcon size={18}/>
                        <Maximize2 size={18}/>
                    </div> */}
                    <div className="flex gap-3 py-0 h-full w-full bg-red-0 w-min">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="aspect-square w-[120px] h-[120px] py-4 px-3 hover:p-3 rounded text-sm flex  justify-between 
                            bg-neutral-0 font-semibold  flex-col text-start items-start gap-3  border border-[2px] border-neutral-600"
                        >
                            <ArrowUpRightIcon size={17} className="-mr-2"/>
                            <span> Nova venda</span>
                          
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                            bg-blue-500 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                        >
                            <ArrowUpRightIcon size={17} className="-mr-2"/>
                            <span>Consultar tickets vendidos</span>
                          
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                            bg-blue-500 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                        >
                            <ArrowUpRightIcon size={17} className ="-mr-2"/>
                            <span>Consultar inventário</span>
                          
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                            bg-blue-500 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                        >
                            <ArrowUpRightIcon size={17} className="-mr-2"/>
                            <span>Outros serviços</span>
                          
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                            bg-blue-500 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                        >
                            <ArrowUpRightIcon size={17} className="-mr-2"/>
                            <span>Vender volume de bagagem</span>
                          
                        </button>
                        {/* <button className="p-4 min-w-[100px] w-full  rounded flex flex-col gap-2 bg-neutral-0 aspect-square m-0 max-w-[120px] max-h-[120px] border flex flex-col items-stretch content-between text-xs font-semibold">
                            <div className="h-3/6 flex items-start bg-red-0">
                                <PenTool size={22} strokeWidth={1}  stroke="#006421"/>
                            </div>
                            <span className="flex items-end bg-red-0 h-full">
                                Meus Serviços
                            </span>
                        </button> */}
                       
                    </div>
                </div>
                <hr/>
                <div className=" w-full h-80  bg-white flex flex-col sm:flex-start gap-5 p-5 h-full ">
                   
                        <span className="">
                            <h3 className="font-semibold text-lg">
                                Caixa
                            </h3>
                            <p className="text-neutral-700">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
                            </p>
                        </span>
                        {/* <div className="flex gap-2">
                            <EllipsisIcon size={18}/>
                            <Maximize2 size={18}/>
                        </div> */}
                   
                    <div className="flex flex gap-3 py-6 h-full w-full bg-red-0 flex-wrap">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                            bg-blue-500 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                        >
                            <ArrowUpRightIcon size={17} className="-mr-2"/>
                            <span>Pagar</span>
                          
                        </button>
                        
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                            bg-blue-500 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                        >
                            <ArrowUpRightIcon size={17} className="-mr-2"/>
                            <span>Receber</span>
                          
                        </button>
                        
                        {/* <button className="p-4 min-w-[100px] w-full  rounded flex flex-col gap-2 bg-neutral-0 aspect-square m-0 max-w-[120px] max-h-[120px] border flex flex-col items-stretch content-between text-xs font-semibold">
                            <div className="h-3/6 flex items-start bg-red-0">
                                <PenTool size={22} strokeWidth={1}  stroke="#006421"/>
                            </div>
                            <span className="flex items-end bg-red-0 h-full">
                                Meus Serviços
                            </span>
                        </button> */}
                       
                        <button 
                            className="w-full[120px] h-[120px] p-3 rounded text-sm flex  justify-between min-w-[120px]
                            bg-blue-100 border-transparent max-w-[240px] font-semibold  flex-col text-start items-start gap-3 min-w-30"
                        >
                            <ArrowUpRightIcon size={17} className="-mr-2"/>
                            <span>Receber</span>
                        </button>
                        <Link 
                            href={""}
                            className="h-10 rounded-sm flex items-center justify-between mt-5 -mb-0 w-min whitespace-nowrap underline font-semibold px-3 text-sm"
                        >
                            Ver histórico de transação
                        </Link>
                    </div>
                </div>
                <hr/>
                <div className="  w-full h-min  flex flex-col p-5 ">
                    <div className="">
                        <h3 className="font-semibold text-lg">
                            Resumo do dia
                        </h3>
                        <span className="text text-neutral-700 mt-[-12px]">
                            Hoje
                        </span>
                    </div>
                    {/* <div className="flex gap-2">
                        <EllipsisIcon size={18}/>
                        <Maximize2 size={18}/>
                    </div> */}
                    <div className="py-5 flex flex-col gap-6 w-min">
                        <div className="flex flex items-center gap-2  w-full justify-between">
                            <div className="flex items-center gap-2 ">
                                <div className="h-5 w-5 rounded-full bg-neutral-200 flex items-center justify-center">
                                    <Circle 
                                        className="opacity-100" 
                                        size={10} 
                                        strokeWidth={0}
                                        fill="#c0c0c0"
                                    />
                                </div>
                                <div className="text-">
                                    Vendas
                                </div>
                            </div>
                            <span className="text-  font-bold flex items-center justify-center">
                                7
                            </span>
                        </div>
                        <div className="flex flex items-center gap-2  w-full justify-between">
                            <div className="flex items-center gap-2 ">
                                <div className="h-5 w-5 rounded-full bg-neutral-200 flex items-center justify-center">
                                    <Circle 
                                        className="opacity-100" 
                                        size={10} 
                                        strokeWidth={0}
                                        fill="#c0c0c0"
                                    />
                                </div>
                                <div className="text-">
                                    Pagamentos
                                </div>
                            </div>
                            <span className="text-  font-bold flex items-center justify-center">
                                7
                            </span>
                        </div>
                         <div className="flex flex items-center gap-2  w-full justify-between">
                            <div className="flex items-center gap-2 ">
                                <div className="h-5 w-5 rounded-full bg-neutral-200 flex items-center justify-center">
                                    <Circle 
                                        className="opacity-100" 
                                        size={10} 
                                        strokeWidth={0}
                                        fill="#c0c0c0"
                                    />
                                </div>
                                <div className="text-">
                                    Recebimentos
                                </div>
                            </div>
                            <span className="text-  font-bold flex items-center justify-center">
                                7
                            </span>
                        </div>
                         <div className="flex flex items-center gap-2  w-full justify-between">
                            <div className="flex items-center gap-2 ">
                                <div className="h-5 w-5 rounded-full bg-neutral-200 flex items-center justify-center">
                                    <Circle 
                                        className="opacity-100" 
                                        size={10} 
                                        strokeWidth={0}
                                        fill="#c0c0c0"
                                    />
                                </div>
                                <div className="text-">
                                    Estornos
                                </div>
                            </div>
                            <span className="text-  font-bold flex items-center justify-center">
                                7
                            </span>
                        </div>
                    </div>
                    <Link 
                        href="/" 
                        className="text-xs text-blue-600 hover:text-blue-500 underline"
                    >
                        Mais informações
                    </Link>
                </div>
                {/* <div 
                    className="border border-zinc-200 w-full h-min rounded bg-white flex flex-col p-5 "
                >
                    <div className="flex justify-between">
                        <div className="">
                            <h3 className="font-semibold ">
                                Meio de pagamento
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <EllipsisIcon size={18}/>
                            <div className="h-8 w-8 bg-white hover:bg-zinc-50 flex items-center justify-center rounded-full">
                                <Maximize2  size={18}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col py-3">
                    <div className="text-sm flex justify-between h-16 items-center ">
                        <div className="flex gap-2 items-center">
                            <div className="h-full w-10 flex  items-center">
                                <img 
                                    className="h-7 w-7" 
                                    src="https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon.png"
                                />
                            </div>
                            <span className="font-semibold">
                                Dinheiro
                            </span>
                        </div>
                        <span className="font-semibold text-xs">
                            R$ 11,00
                        </span>
                    </div>
                    <div className="h-[1px] border-b border-zinc-200"></div>
                    <div className="text-sm flex justify-between h-16 items-center ">
                        <div className="flex gap-2 items-center">
                            <div className="h-full w-10 flex  items-center">
                                <img 
                                    className="h-7 w-7" 
                                    src="https://cdn-icons-png.flaticon.com/512/6963/6963703.png"
                                />
                            </div>
                            <span className="font-semibold">
                                Cartão
                            </span>
                        </div>
                        <span className="font-semibold text-xs">
                            R$ 11,00
                        </span>
                    </div>
                    <div className="h-[1px] border-b border-zinc-200"></div>
                    <div className="text-sm flex justify-between h-16 items-center ">
                        <div className="flex gap-2 items-center">
                            <div className="h-full w-10 flex  items-center">
                                <img 
                                    className="h-7 w-7" 
                                    src="https://cdn-icons-png.flaticon.com/512/438/438062.png"
                                />
                            </div>
                            <span className="font-semibold">
                                Maquininha
                            </span>
                        </div>
                        <span className="font-semibold text-xs">
                            R$ 11,00
                        </span>
                    </div>
                    <div className="h-[1px] border-b border-zinc-200"></div>
                    <div className="text-sm flex justify-between h-16 items-center ">
                        <div className="flex gap-2 items-center">
                            <div className="h-full w-10 flex  items-center">
                                <img 
                                    className="h- w-5" 
                                    src="https://user-images.githubusercontent.com/741969/99538099-3b7a5d00-298b-11eb-9f4f-c3d0cd4a5280.png"
                                />
                            </div>
                            <span className="font-semibold">
                                Pix
                            </span>
                        </div>
                        <span className="font-semibold text-xs">
                            R$ 11,00
                        </span>
                    </div>
                    <div className="h-[1px] border-b border-zinc-200"></div>
                    <div className="text-sm flex justify-between h-16 items-center ">
                        <div className="flex gap-2 items-center">
                            <div className="h-full w-10 flex  items-center">
                                <img 
                                    className="h-7 w-7" 
                                    src="https://data4you.com.br/wp-content/uploads/2018/08/suporte_transferencia.png"
                                />
                            </div>
                            <span className="font-semibold">
                                Transfêrencia bancária (doc)
                            </span>
                        </div>
                        <span className="font-semibold text-xs whitespace-nowrap">
                            R$ 11,00
                        </span>
                    </div>
                    <div className="h-[1px] border-b border-zinc-200"></div>
                    <div className="text-sm flex justify-between h-16 items-center ">
                        <div className="flex gap-2 items-center">
                            <div className="h-full w-10 flex  items-center">
                                <img 
                                    className="h-7 w-7" 
                                    src="https://play-lh.googleusercontent.com/JuI8R5127R3sNDQHAxUG4wQ7jNBjD1-g9LDLZQQlwOPVnizquNKqZ7i_oD3WS-bQCf8"
                                />
                            </div>
                            <span className="font-semibold">
                                Boleto
                            </span>
                        </div>
                        <span className="font-semibold text-xs whitespace-nowrap">
                            R$ 11,00
                        </span>
                    </div>
                    </div>
                </div> */}
            </div>
           <button 
                className="   h-10 px-3 rounded  text-sm  whitespace-nowrap w-full max-w-[400px] flex items-center justify-between 
                bg-green-500  border-transparent   text-white font-semibold w-min"
            >
                Apurar caixa
                {/* <ChevronRight size={17} 
                    className="-mr-2" 
                    strokeWidth={1}
                /> */}
            </button>
        </main>
    )
}