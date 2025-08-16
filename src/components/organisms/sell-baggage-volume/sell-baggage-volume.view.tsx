'use client'
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Minus, Plus, PlusIcon, Search, SidebarCloseIcon, UserRound, Watch, X } from "lucide-react";
import { useForm, SubmitHandler, UseFormSetValue, Controller, useFieldArray } from "react-hook-form"
import React, { FormEvent, useEffect, useMemo, useState } from "react";


type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export default function SellBaggageVolume({ setShowModal }: Props ) {
    
    const {
        register,
        watch,
        formState: { errors, isDirty, isLoading },
        control,
    } = useForm<any>({ 
        mode: 'all', 
        // resolver: zodResolver(),
        // defaultValues: {
        //     servicesList: [{ value: "" }] 
        // }
    })
   
    return (
        <>
            <div 
            onClick={(e) => e.stopPropagation()}
            className='scale-up-center flex flex-col w-full max-w-[560px] h-full p-0  bg-white gyhd sm:rounded-sm max-h-[90%]'
            >
                <div className="flex h-14 border-b items-center bg-neutral-0 gap-3 justify-between px-3 sm:px-6">
                    <div className={`hidden`}>
                        <ArrowLeft/>
                    </div>
                    <h2 className='text-xl font-bold '>
                        Nova venda
                    </h2>
                    <button 
                        onClick={() => setShowModal(false)}
                        className={`h-full flex items-center justify-center self-end text-sm text-red-500`}
                    >
                        Cancelar
                    </button>
                </div>
                <div className='w-full h-full flex flex-col p-6 gap-3'>
                    <div className="bg-gray-0 w-36 rounded-md border overflow-hidden">
                        <div className="flex flex-col rounded-sm w-full h-full items-center text-center bg-red-0 ">
                            <div className="overflow-hidden w-full aspect-square">
                                <img src="https://static.vecteezy.com/system/resources/previews/051/004/726/non_2x/a-drawing-of-a-suitcase-on-wheels-vector.jpg"/>
                            </div>
                            <div className="w-full text-sm mt-3 mb-3">fgfgfg</div>
                        </div>
                    </div>
                    <div className="bg-gray-0 w-36 rounded-md border overflow-hidden">
                        <div className="flex flex-col rounded-sm w-full h-full items-center text-center bg-red-0 ">
                            <div className="overflow-hidden w-full aspect-square">
                                <img src="https://static.vecteezy.com/system/resources/previews/051/004/726/non_2x/a-drawing-of-a-suitcase-on-wheels-vector.jpg"/>
                            </div>
                            <div className="w-full text-sm mt-3 mb-3">fgfgfg</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

