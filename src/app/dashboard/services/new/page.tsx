
'use client';
import { useState } from 'react';


type Experience = {
    id: string
    notes?: string
    // daysAndTimes?: DayAndTime[]    // JSON
    prices: {
        id: string
        ageRange: string // Child (1-11 years) | General (1-65+ years)
        minPrice: number,
        maxPrice: number,
        defaultPrice?: number
    }[] // JSON
    availableTickets: number
    soldTickets: number
    remainingTickets: number
    minPerUser: number
    maxPerUser: number
    disabled: boolean
}


type DayAndTime = {
    timeZone: string,
    availabilityDay: string,  // '2025-02-16'                  // Ex: 2025-07-16
    timeStart?: string              // Ex: "14:00"
    timeEnd?: string                // Ex: "16:00"
    // totalTickets?: number
    // ticketsSold?: number
    // minPerUser?: number
    // maxPerUser?: number
   
    notes?: string | null
    // ageRange?: string // Child (1-11 years) | General (1-65+ years)
    // prices: {
    //     id: string
    //     ageRange: string // Child (1-11 years) | General (1-65+ years)
    //     minPrice: number,
    //     maxPrice: number,
    //     defaultPrice?: number
    // }[]
}


export default function ItemPage() {
    return (
        <div className="flex flex-col w-full max-w-[600px]">
            <div className="p-20">
                <h1 className="text-xl font-bold">Passeio de barco em Angra dos Reis</h1>
                <div className="bg-neutral-0 py-5">
                    <table className="flex flex-start justfy-start items-start gap-5">
                        <thead className="flex flex-col items-start font-normal">
                            <th>id</th>
                            <th>soldTickets</th>
                            <th>remainingTickets</th>
                        </thead>
                        <tbody className="flex flex-col items-start">
                            <tr>4df5a4d5f4a5dsf5</tr>
                            <tr>55</tr>
                            <tr>45</tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col gap-3">
                    <div className={`flex flex-col`}>
                        <label className="">Description</label>
                        <div className="border h-10 w-full rounded-sm">
                             <input className="w-full h-full"/>
                        </div>
                    </div>
                     <div className={`flex flex-col`}>
                        <label className="">Bilhetes disponíveis</label>
                        <div className="border h-10 w-full rounded-sm">
                             <input className="w-full h-full"/>
                        </div>
                    </div>
                     <div className={`flex flex-col`}>
                        <label className="">Mínimo por usuário</label>
                        <div className="border h-10 w-full rounded-sm">
                             <input className="w-full h-full"/>
                        </div>
                    </div>
                    <div className={`flex flex-col`}>
                        <label className="">Max por usuário</label>
                        <div className="border h-10 w-full rounded-sm">
                             <input className="w-full h-full"/>
                        </div>
                    </div>
                    <div className={`flex flex-col`}>
                        <label className="">Status</label>
                        
                            <DisableToggle/>
                       
                    </div>
                    <div className={`flex flex-col`}>
                        <label className="">Notes</label>
                        <div className="border h-10 w-full rounded-sm">
                             <input className="w-full h-full"/>
                        </div>
                    </div>
                </div>
                <hr className="my-3"/>
                 <h2 className='mb-3 font-bold text-xl'>Preços</h2>
                <div>
                    <div className="border rounded-sm p-5">
                        <div className={`flex flex-col`}>
                            <label className="">Faixa de idade ou categoria</label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                        <div className={`flex flex-col`}>
                            <label className="">Preço mínimo (R$)</label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                        <div className={`flex flex-col`}>
                            <label className="">Preço máximo (R$)</label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                         <div className={`flex flex-col`}>
                            <label className="">Preço padrão (R$)</label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-3"/>
                <div>
                    <style>

                    </style>
                    <h2 className='mb-3 font-bold text-xl'>Datas e horários</h2>
                    <div className="border rounded-3xl p-4 text-sm flex flex-col gap-3">
                        <div className={`flex flex-col gap-1`}>
                            <label className="flex gap-1">
                                <span className="text-red-700">*</span>
                                <span className="font-medium">Time Zone</span>
                              
                            </label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                        <div className={`flex flex-col`}>
                            <label className="">Data</label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                        <div className={`flex flex-col`}>
                            <label className="">De</label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                        <div className={`flex flex-col`}>
                            <label className="">Às</label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                        <div className={`flex flex-col`}>
                            <label className="">Nota</label>
                            <div className="border h-10 w-full rounded-sm">
                                <input className="w-full h-full"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DisableToggle() {
 const [enabled, setEnabled] = useState(false);


    return (
        <div className="flex flex-col gap-4 p-4">
            <label className="flex items-center cursor-pointer justify-between w-full">
                <span className="ml-3 text-sm font-medium text-gray-900">
                    {enabled ? 'Habilitado' : 'Desabilitado'}
                </span>
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => setEnabled(!enabled)}
                        className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        enabled ? 'translate-x-5' : ''
                        }`}
                    ></div>
                </div>
               
            </label>
        </div>
    )
}
