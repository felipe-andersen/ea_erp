
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { Icon, MinusIcon, Settings } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateExperienceSchema } from './create-service-schema';
import { capitalizeWords } from '@/shared/capitalizeWords';
import CreatePriceForm from './create-prices.view';
import CreateDateAndTimeForm from './create-timestamp-view';

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
type CreateExperienceType = z.infer<typeof CreateExperienceSchema>

export default function Content() {

     const {
            register,
            watch,
            formState: { errors, isValid, isDirty, isLoading },
            control,
        } = useForm<CreateExperienceType>({ 
            mode: 'all', 
            resolver: zodResolver(CreateExperienceSchema),
            // defaultValues: {
            //     servicesList: [{ value: "" }] 
            // }
        })

        const { fields:pricesFild, append:pricesAppend, remove:pricesRemove } = useFieldArray({control, name:'prices'})
    
        const prevent = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        };
    
    return (
        <div className="flex flex-col w-full p-4 overflow-y-scroll">
            <div className="bg-white p-10  max-w-[600px] h-auto">
                <h1 className="text-xl font-bold">Experiência</h1>
                <p className='text-sm'>Atualize os dados da experiência</p>
                <div className="bg-neutral-0 py-5">
                    <div className='flex flex flex-col text-sm gap-1'>
                        {/* <div className="text-sm font-semibold text-gray-700">id</div>
                        <div className="flex mb-2 text-gray-600">4df5a4d5f4a5dsf5</div> */}
                        <div className="text-sm font-medium text-gray-700">Tickets vendidos</div>
                        <div className="flex mb-2 text-gray-600 ">55</div>
                        <div className="text-sm font-medium text-gray-700">Tickets restantes</div>
                        <div className="flex mb-2 text-gray-600 ">45</div>
                    </div>
                  
                </div>
                <div className="flex flex-col gap-3">
                    <div className='gap-1 h-min mb-4 flex flex-col'>
                        <label className="text-sm font-medium text-gray-700">
                            <span className="text-red-600">*</span> 
                            Título
                        </label>
                        <div className="h-12 w-full border border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                            <input
                                data-test="full-name"
                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                // name="fullName" 
                                spellCheck="false"
                                placeholder={"Título"}
                                type="text"
                                {...register("title", { pattern: /^[A-Za-z]+$/i })}
                                // aria-invalid={errors.name ? "true" : "false"}
                                // value={capitalizeWords(watch('name'))}
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                        {
                            errors.title?.message &&
                            <p className="min-h-5 text-xs text-red-400 flex gap-2 flex ">
                                {errors.title?.message}
                            </p>
                        }
                    </div>
                    <div className='gap-1 h-min mb-4 flex flex-col'>
                        <label className="text-sm font-medium text-gray-700">
                            <span className="text-red-600">*</span> 
                            Descrição
                        </label>
                        <div className="h-12 w-full border border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                            <input
                                data-test="full-name"
                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                // name="fullName" 
                                spellCheck="false"
                                placeholder={"Descrição"}
                                type="text"
                                {...register("description", { pattern: /^[A-Za-z]+$/i })}
                                aria-invalid={errors.id ? "true" : "false"}
                                value={watch('description')}
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                     
                    </div>
                    <div className='gap-1 h-min mb-4 flex flex-col'>
                        <label className="text-sm font-medium text-gray-700">
                            <span className="text-red-600">*</span> 
                            Bilhetes disponíveis
                        </label>
                        <div className="h-12 w-full border border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                            <input
                                data-test="full-name"
                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                // name="fullName" 
                                spellCheck="false"
                                placeholder={"Bilhetes disponíveis"}
                                type="number"
                                // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                // aria-invalid={errors.name ? "true" : "false"}
                                // value={capitalizeWords(watch('name'))}
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                      
                    </div>
                    <div className='gap-1 h-min mb-4 flex flex-col'>
                        <label className="text-sm font-medium text-gray-700">
                            <span className="text-red-600">*</span> 
                            Mínimo por usuário
                        </label>
                        <div className="h-12 w-full border border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                            <input
                                data-test="full-name"
                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                // name="fullName" 
                                spellCheck="false"
                                placeholder={"Mínimo por usuário"}
                                min={0}
                                type="number"
                                {...register("minPerUser",  { pattern: /^[A-Za-z]+$/i})}
                                aria-invalid={errors.minPerUser ? "true" : "false"}
                                value={watch('minPerUser')}
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                        {
                            errors.minPerUser?.message &&
                            <p className="min-h-5 text-xs text-red-400 flex gap-2 flex ">
                                {errors.minPerUser?.message}
                            </p>
                        }
                    </div>
                     <div className='gap-1 h-min mb-4 flex flex-col'>
                        <label className="text-sm font-medium text-gray-700">
                            <span className="text-red-600">*</span> 
                            Máximo por usuário
                        </label>
                        <div className="h-12 w-full border border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                            <input
                                data-test="full-name"
                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                // name="fullName" 
                                spellCheck="false"
                                placeholder={"Máximo por usuário"}
                                type="number"
                                {...register("maxPerUser", { pattern: /^[A-Za-z]+$/i })}
                                aria-invalid={errors.maxPerUser ? "true" : "false"}
                                value={watch('maxPerUser')}
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                        {
                            errors.maxPerUser?.message &&
                            <p className="min-h-5 text-xs text-red-400 flex gap-2 flex ">
                                {errors.maxPerUser?.message}
                            </p>
                        }
                    </div>
                    <div className={`flex flex-col`}>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <DisableToggle/>
                    </div>
                    <div className='gap-1 h-min mb-4 flex flex-col'>
                        <label className="text-sm font-medium text-gray-700">
                            <span className="text-red-600">*</span> 
                            Notas
                        </label>
                        <div className="h-20 w-full border h-min border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                            <textarea
                                data-test="full-name"
                                className="text-sm w-full  h-20 px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                // name="fullName" 
                                spellCheck="false"
                                
                                // type="text"
                                {...register("notes", { pattern: /^[A-Za-z]+$/i })}
                                aria-invalid={errors.notes ? "true" : "false"}
                                value={watch('notes')}
                            />
                            {/* <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span> */}
                        </div>
                    </div>
                </div>
                <hr className="my-3"/>
                {/* <h2 className='mb-3 font-bold text-xl'>Preços</h2>
                <button className='h-10 px-3 mb-3 text-sm  font-medium bg-neutral-200 rounded'>
                    Adicionar
                </button> */}
                {/* <div className='relative'>
                    <button
                        className="absolute rounded-full w-8 h-8 flex items-center justify-center border-[1px] -mt-4 ml-[calc(100%-40px)]  border bg-white"
                        // onClick={() => removeService(index)}
                    >
                        <MinusIcon size={20}/>
                    </button>
                    <div className="border rounded-md p-5">
                        {
                           pricesFild.map((priceFild, index) => {
                                return (
                                    <>
                          
                                    <div className='gap-1 h-min mb-4 flex flex-col'>
                                        <label className="text-sm font-medium text-gray-700">
                                            <span className="text-red-600">*</span> 
                                            Faixa Etária ou categoria 
                                        </label>
                                        <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                            <input
                                                data-test="full-name"
                                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                                // name="fullName" 
                                                spellCheck="false"
                                                placeholder={"Ricardo Albuquerque"}
                                                type="text"
                                                {...register(`prices.${index}.ageRange`, { pattern: /^[A-Za-z]+$/i })}
                                                // aria-invalid={errors.prices ? "true" : "false"}
                                                value={priceFild.ageRange}
                                            />
                                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                <span className="loader" />
                                            </span>
                                        </div>
                                        {
                                            errors?.prices?.[index]?.ageRange?.message &&
                                            <p className="min-h-5 text-xs text-red-400 flex gap-2 flex ">
                                                {errors?.prices?.[index]?.ageRange?.message}
                                            </p>
                                        }
                                    </div>
                                    <div className='gap-1 h-min mb-4 flex flex-col'>
                                        <label className="text-sm font-medium text-gray-700">
                                            <span className="text-red-600">*</span> 
                                            {"Preço mínimo"}
                                        </label>
                                        <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                            <input
                                                data-test="full-name"
                                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                                // name="fullName" 
                                                spellCheck="false"
                                                placeholder={"Ricardo Albuquerque"}
                                                type="text"
                                                // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                                // aria-invalid={errors.name ? "true" : "false"}
                                                // value={capitalizeWords(watch('name'))}
                                            />
                                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                <span className="loader" />
                                            </span>
                                        </div>
                                        
                                    </div>
                                    <div className='gap-1 h-min mb-4 flex flex-col'>
                                        <label className="text-sm font-medium text-gray-700">
                                            <span className="text-red-600">*</span> 
                                            {"Preço máximo"}
                                        </label>
                                        <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                            <input
                                                data-test="full-name"
                                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                                // name="fullName" 
                                                spellCheck="false"
                                                placeholder={"Ricardo Albuquerque"}
                                                type="text"
                                                // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                                // aria-invalid={errors.name ? "true" : "false"}
                                                // value={capitalizeWords(watch('name'))}
                                            />
                                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                <span className="loader" />
                                            </span>
                                        </div>
                                      
                                    </div>
                                    <div className='gap-1 h-min mb-4 flex flex-col'>
                                        <label className="text-sm font-medium text-gray-700">
                                            <span className="text-red-600">*</span> 
                                            {"Preço padrão"}
                                        </label>
                                        <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                            <input
                                                data-test="full-name"
                                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                                // name="fullName" 
                                                spellCheck="false"
                                                placeholder={"Ricardo Albuquerque"}
                                                type="text"
                                                // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                                // aria-invalid={errors.name ? "true" : "false"}
                                                // value={capitalizeWords(watch('name'))}
                                            />
                                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                <span className="loader" />
                                            </span>
                                        </div>
                                        
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div> */}

                {/* Prices */}
                <CreatePriceForm/>

                <hr className="my-5"/>
                {/* <div>
                    <h2 className='mb-3 font-bold text-xl'>Datas e horários</h2>
                    <div className="border rounded-md p-5 text-sm flex flex-col ">
                        <div className='gap-1 h-min mb-4 flex flex-col'>
                            <label className="text-sm font-medium text-gray-700">
                                <span className="text-red-600">*</span> 
                                Time zone
                            </label>
                            <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                <input
                                    data-test="full-name"
                                    className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                    // name="fullName" 
                                    spellCheck="false"
                                    placeholder={"Ricardo Albuquerque"}
                                    type="text"
                                    // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                    // aria-invalid={errors.name ? "true" : "false"}
                                    // value={capitalizeWords(watch('name'))}
                                />
                                <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                    <span className="loader" />
                                </span>
                            </div>
                           
                        </div>
                        <div className='gap-1 h-min mb-4 flex flex-col'>
                            <label className="text-sm font-medium text-gray-700">
                                <span className="text-red-600">*</span> 
                                Data
                            </label>
                            <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                <input
                                    data-test="full-name"
                                    className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                    // name="fullName" 
                                    spellCheck="false"
                                    placeholder={"DD/MM/YYYY"}
                                    type="text"
                                    // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                    // aria-invalid={errors.name ? "true" : "false"}
                                    // value={capitalizeWords(watch('name'))}
                                />
                                <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                    <span className="loader" />
                                </span>
                            </div>
                           
                        </div>
                        <div className='gap-1 h-min mb-4 flex flex-col'>
                            <label className="text-sm font-medium text-gray-700">
                                <span className="text-red-600">*</span> 
                                De
                            </label>
                            <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                <input
                                    data-test="full-name"
                                    className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                    // name="fullName" 
                                    spellCheck="false"
                                    placeholder={"DD/MM/YYYY"}
                                    type="text"
                                    // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                    // aria-invalid={errors.name ? "true" : "false"}
                                    // value={capitalizeWords(watch('name'))}
                                />
                                <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                    <span className="loader" />
                                </span>
                            </div>
                            
                        </div>
                        <div className='gap-1 h-min mb-4 flex flex-col'>
                            <label className="text-sm font-medium text-gray-700">
                                <span className="text-red-600">*</span> 
                                Às
                            </label>
                            <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                <input
                                    data-test="full-name"
                                    className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                    // name="fullName" 
                                    spellCheck="false"
                                    placeholder={"DD/MM/YYYY"}
                                    type="text"
                                    // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                    // aria-invalid={errors.name ? "true" : "false"}
                                    // value={capitalizeWords(watch('name'))}
                                />
                                <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                    <span className="loader" />
                                </span>
                            </div>
                          
                        </div>
                        <div className='gap-1 h-min mb-4 flex flex-col'>
                            <label className="text-sm font-medium text-gray-700">
                                <span className="text-red-600">*</span> 
                                Nota
                            </label>
                            <div className="h-12 w-full border-[2px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                <input
                                    data-test="full-name"
                                    className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                    // name="fullName" 
                                    spellCheck="false"
                                    placeholder={"DD/MM/YYYY"}
                                    type="text"
                                    // {...register("name", { pattern: /^[A-Za-z]+$/i })}
                                    // aria-invalid={errors.name ? "true" : "false"}
                                    // value={capitalizeWords(watch('name'))}
                                />
                                <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                    <span className="loader" />
                                </span>
                            </div>
                           
                        </div>
                    </div>
                </div> */}

                {/* Dates and times */}
                <CreateDateAndTimeForm/>
             
            </div>
        </div>
    )
}


export function DisableToggle() {
 const [enabled, setEnabled] = useState(true);


    return (
        <div className="flex flex-col gap-4 py-3">
            <label className="flex items-center cursor-pointer justify-between w-full">
                <span className="text-sm text-gray-900">
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
