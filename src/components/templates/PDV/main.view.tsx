'use client'
import { ArrowBigRight, ArrowRightIcon, ArrowUpRight, ArrowUpRightIcon, ChevronLeft, ChevronRight, Circle, EllipsisIcon, HelpCircle, LifeBuoy, Link2, Maximize2, PenTool, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { NewSale } from "@/components/organisms/forms/newSale";
import { useState } from "react";
import { Modal } from "@/components/organisms/modal/modal.view";
import ExpensePayment from "@/components/organisms/expense-payment/expense-payment.view";
import ReceivePayment from "@/components/organisms/receive-payment/receive-payment.view";
import RefundPayment from "@/components/organisms/refund-payment/refund-payment.view";


export function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expensePaymentVisibility, setExpensePaymentVisibility] = useState(false);
    const [receivePaymentVisibility, setReceivePaymentVisibility] = useState(false);
    const [refundPaymentVisibility, setRefundPaymentVisibility] = useState(false);
    

    return (

        <div className="h-[calc(100vh-48px)] flex justify-center overflow-y-scroll">
            <div className="h-auto p-3 sm:p-6 bottom-16 flex flex-col gap-5 w-[800px] bg-white">
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
            {
                 <Modal
                    onClose={setExpensePaymentVisibility}
                    isOpen={expensePaymentVisibility}
                >
                    <ExpensePayment setShowModal={setExpensePaymentVisibility}/>
                </Modal>
            }
            {
                 <Modal
                    onClose={setReceivePaymentVisibility}
                    isOpen={receivePaymentVisibility}
                >
                    <ReceivePayment setShowModal={setReceivePaymentVisibility}/>
                </Modal>
            }
            {
                 <Modal
                    onClose={setRefundPaymentVisibility}
                    isOpen={refundPaymentVisibility}
                >
                    <RefundPayment setShowModal={setRefundPaymentVisibility}/>
                </Modal>
            }
                <div className="flex gap-5 w-full h-full flex-col">
                    <div className=" w-full h-full flex flex-col sm:flex-start gap-5 p-5">
                        <span className="flex flex-col gap-2 w-full">
                            <h3 className="font-semibold text-lg">
                                Vendas
                            </h3>
                            <p className="text-neutral-600">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
                            </p>
                        </span>
                        <div className="flex gap-3 py-0 h-full w-full bg-red-0 w-min">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="aspect-square w-[120px] h-[120px] py-4 px-3 hover:p-3 rounded text-sm flex justify-between 
                                bg-blue-50 font-semibold flex-col text-start items-start gap-3 border border-[0px] border-blue-900"
                            >
                                <ArrowUpRightIcon size={17} className="-mr-2"/>
                                <span>Nova venda</span>
                            
                            </button>
                            <button 
                                onClick={() => {}}
                                className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                                bg-blue-900 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                            >
                                <ArrowUpRightIcon size={17} className="-mr-2"/>
                                <span>Consultar tickets vendidos</span>
                            
                            </button>
                            <button 
                                onClick={() => {}}
                                className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                                bg-blue-900 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                            >
                                <ArrowUpRightIcon size={17} className ="-mr-2"/>
                                <span>Consultar inventário</span>
                            
                            </button>
                            <button 
                                onClick={() => {}}
                                className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                                bg-blue-500 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                            >
                                <ArrowUpRightIcon size={17} className="-mr-2"/>
                                <span>Outros serviços</span>
                            
                            </button>
                            <button 
                                onClick={() => {}}
                                className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                                bg-blue-500 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                            >
                                <ArrowUpRightIcon size={17} className="-mr-2"/>
                                <span>Vender volume de bagagem</span>
                            
                            </button>
                        </div>
                    </div>
                    <hr/>
                    <div className="w-full bg-white flex flex-col sm:flex-start gap-5 p-5 h-full ">
                        <span className="">
                            <h3 className="font-semibold text-lg">
                                Caixa
                            </h3>
                            <p className="text-neutral-700">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
                            </p>
                        </span>
                        <div className="flex flex gap-3 py-6 h-full w-full bg-red-0 flex-wrap">
                            <button 
                                onClick={() => setExpensePaymentVisibility(true)}
                                className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                                bg-blue-900 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                            >
                                <ArrowUpRightIcon size={17} className="-mr-2"/>
                                <span>Pagar</span>
                            </button>
                            <button 
                                onClick={() => setReceivePaymentVisibility(true)}
                                className="w-[120px] h-[120px] p-3 rounded text-sm flex justify-between 
                                bg-blue-900 border-transparent text-white font-semibold flex-col text-start items-start gap-3 min-w-30"
                            >
                                <ArrowUpRightIcon size={17} className="-mr-2"/>
                                <span>Receber</span>
                            </button>
                            <button 
                                className="w-full[120px] h-[120px] p-3 rounded text-sm flex  justify-between min-w-[120px]
                                bg-blue-100 border-transparent max-w-[240px] font-semibold  flex-col text-start items-start gap-3 min-w-30"
                                onClick={() => setRefundPaymentVisibility(true)}
                            >
                                <ArrowUpRightIcon size={17} className="-mr-2"/>
                                <span>Extorno</span>
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
                    {/* <div className="w-full h-full flex flex-col p-5">
                        <div className="">
                            <h3 className="font-semibold text-lg">
                                Resumo do dia
                            </h3>
                            <span className="text text-neutral-700 mt-[-12px]">
                                Hoje
                            </span>
                        </div>
                        
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
                    
                    </div> */}
                    <button 
                        className="h-10 px-3 rounded text-sm whitespace-nowrap w-full max-w-[400px] flex items-center justify-between 
                        bg-green-500  border-transparent text-white font-semibold w-min"
                    >
                        Apurar caixa
                    </button>
                </div>
            </div>
        </div>
    )
}