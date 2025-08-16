
'use client'
import { X, Bell, MessageSquareIcon, MoveRight, EllipsisVertical, Key, Table, List, Filter, Sidebar, FilterIcon, ArrowUpRightIcon} from "lucide-react";
import { useRouter } from 'next/navigation';
import { capitalizeWords } from '@/shared/capitalizeWords';
import React, { useState, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { Modal as GlobalModal} from "@/components/organisms/modal/modal.view";

interface Category {
    category: string
}

const serviceCategories_exemple: Category[] = [
    {category:"pintura"},
    {category:"lavagem"},
]

console.table(serviceCategories_exemple)

const services = [
    {
        name: "Lavagem simples",
        price: "40,00 - 50,00",
        description: "Lorem Ipson ",
        id: "52fg5gh",
        type: "Sujeira leve",
        category: "lavagem"
    },
    {
        name: "Lavagem simples",
        price: "50,00 - 70,00",
        description: "Lorem Ipson ",
        id: "j5fff4x3",
        type: "Sujeira média",
        category: "lavagem"
    },
    {
        name: "Lavagem simples",
        price: "50,00 - 70,00",
        description: "Lorem Ipson ",
        id: "k2fg54f8",
        type: "Sujeira pesada",
        category: "lavagem"
    },
]

type CategoryModalType = {
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
};

function CategoryModal({isOpen, onClose}: CategoryModalType)  {
    const [categoryName, setCategoryName] = useState("");

    const isDisabled = categoryName.trim() === "";

    const handleSave = () => {
        if (!isDisabled) {
            onSave()
            handleClose();
        }
    };

    const handleClose = () => {
        setCategoryName("");
        onClose(false);
    };

    const onSave = () => {
        const category = categoryName.trim()
        console.log(category, "saved");
        // Simule um envio para a API, ou atualize seu estado global.
        alert(`Categoria "${category}" salva com sucesso!`);
    };

    if (!isOpen) return null;

    return (
        <div
        onClick={() => onClose(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        >
        Modal categoria 
        </div>
    );
};

export async function Modal() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveCategory = (categoryName: string) => {
        console.log(categoryName, "saved");
  
        alert(`Categoria "${categoryName}" salva com sucesso!`);
    };
    
    return (
       <div onClick={() => {}} className='flex items-center justify-center fixed top-0 botton-0 right-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-[100000]'>
            <div  onChange={(e) => e.stopPropagation()} className='text-neutral-800 w-full h-min md:max-w-96 md:max-h-80 md:max-h-64 bg-white p-5 rounded-xl flex flex-col gap-3'>
                <div>Categoria</div>
                <div className=" w-full h-min  flex  flex flex-col gap-2">
                    <label className=" text-xs font-semibold">
                        Nome *
                    </label>   
                    <div className={`h-10 w-full max-w-[360px]  border-[2px] border-zinc-200 flex  rounded-lg  items-center hover:border-zinc-300`}>
                        <input
                            className={`w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 text-sm`}
                            // name="fullName" 
                            spellCheck="false"
                          
                            // placeholder={`${placeholder.fullName ? placeholder.fullName : "Jon Doe"}`}
                            type="text" 
                            // {...register("fullName") }
                            // aria-invalid={errors.fullName ? "true" : "false"} 
                            defaultValue={capitalizeWords('Lavagem de estofados')}
                            // onChange={(data) => data}
                            // onChange={(e) => e.isPropagationStopped() && }
                        />
                        <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                            <span className="loader"/>
                        </span>
                    </div>
                    {/* {errors.fullName?.message && <p className="min-h-5 text-xs text-red-400 flex gap-2 flex ">{errors.fullName?.message}</p>} */}
                </div>

                <div className='flex gap-2 items-center w-full justify-end'>
                    <button
                       className='border px-3 h-9 rounded-xl text-sm bg-white'
                    >
                        Cancelar
                    </button>
                    <button
                        className='border px-3 h-9 rounded-xl text-sm bg-neutral-800 text-white'
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
       </div>
    )
}

export function Content() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()

    
    return (
    <main className='bg-neutral-100 h-full overflow-y-scroll w-full'>
        <CategoryModal
            onClose={setIsModalOpen}
            isOpen={isModalOpen}
        />
        <div className='w-full h-auto w-full sm:p-8 flex flex-col bg-white'>
            <div className='flex justify-between '>
                <div className='flex flex-col mb-10 gap-3'>
                    <h2 className='text-md font-bold text-xl'>
                        Produtos
                    </h2>
                    <p className='text-neutral-600 text-sm'>
                        1 categoria 3 items cadastrados
                    </p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className=' h-10 w-min px-3 whitespace-nowrap text-sm font-medium  rounded-xl  text-white 0 bg-neutral-900 hover:bg-[#363636]'>
                    Nova categoria
                </button>
             {/* <Modal/> */}
            </div>
            <div className="flex gap-3 py-6">
                <button 
                    onClick={() => router.push("/dashboard/products/ticket")}
                    className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                    bg-blue-900 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                >
                    <ArrowUpRightIcon size={17} className ="-mr-2"/>
                    <span>Tickets</span>
                
                </button>
                <button 
                    onClick={() => router.push("/dashboard/products/ticket")}
                    className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                    bg-blue-900 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                >
                    <ArrowUpRightIcon size={17} className ="-mr-2"/>
                    <span>Bagagens</span>
                
                </button>
                <button 
                    onClick={() => router.push("/dashboard/products/ticket")}
                    className="w-[120px] h-[120px] p-3 rounded text-sm flex  justify-between 
                    bg-blue-900 border-transparent text-white font-semibold  flex-col text-start items-start gap-3 min-w-30"
                >
                    <ArrowUpRightIcon size={17} className ="-mr-2"/>
                    <span>Seguros</span>
                
                </button>
            </div>
            <div className='h-40 w-full bg-white rounded mb-6 gap-6 flex flex-col items-center justify-center border-b-[4px] border-l-[1px] border'>
                Sem produtos cadastrados
                <button className='h-10 border border-black w-min px-6 whitespace-nowrap  text-sm font-semibold rounded '>
                    Adicionar serviço
                </button>
            </div>
        </div>
    </main>
    );
}


  
