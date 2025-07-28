
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { CircleAlertIcon, Icon, MinusIcon, Settings } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { FieldArrayMethodProps, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateExperienceSchema, PricesSchema } from './create-service-schema';
import { capitalizeWords } from '@/shared/capitalizeWords';
import logger from '@/lib/pino';
import { FaQuestion } from 'react-icons/fa6';
import CreatePriceFormTest from './cptest.view';

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

const newPriceRange = {
    id: '',
    ageRange: '', 
    minPrice: 0,
    maxPrice: 0,
    defaultPrice: 0
}

const PricesFormSchema = z.object({
    prices: z.array(PricesSchema)
});

type PricesFormType = z.infer<typeof PricesFormSchema>

export default function CreatePriceForm() {

    const {
        register,
        getValues,
        getFieldState,
        watch,
        formState: { errors, isValid, isDirty, isLoading },
        control,
        } = useForm<PricesFormType>({ 
             mode: 'onChange', 
            resolver: zodResolver(PricesSchema),
            defaultValues: {
                prices: [
                    newPriceRange
                ]
            }
        })

        const {prices} = getValues()

        const { fields:pricesFild, append:priceAppend, remove:priceRemove } = useFieldArray({control, name:'prices'})
    
        const prevent = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        };
    let fdf:FieldArrayMethodProps

    const handlePriceAppend = function (e: FormEvent) {
        e.preventDefault();
      
    }
    return (
        <div className="flex flex-col w-full  overflow-y-scroll bg-red-0">
            <div className="  max-w-[600px]">
                <h2 className='mb-3 font-bold text-xl'>Preços</h2>
                <button className='h-10 px-3 mb-3 text-sm  font-medium bg-neutral-200 rounded'
                    onClick={() => priceAppend(newPriceRange, {shouldFocus: true, focusName: 'ageRange'})}
                >
                    Adicionar
                </button>
                <form className=''>
                    <>
                        {
                            pricesFild.map((priceFild, index) => {
                                return (
                                    <div className="relative border rounded-md p-5 mb-6">
                                        {
                                            pricesFild.length > 1 && 
                                            <button
                                                className="absolute rounded-full w-8 h-8 flex items-center justify-center border-[1px] -mt-4 ml-[calc(100%-40px)]  border bg-white"
                                                onClick={() => priceRemove(index)}
                                            >
                                                <MinusIcon size={20}/>
                                            </button>
                                        }
                                    <div className='gap-1 h-min mb-4 flex flex-col'>
                                        <label className="text-sm font-medium text-gray-700 flex gap-1">
                                            <span className="text-red-600">*</span> 
                                            Faixa Etária ou categoria
                                            <div className='h-4 w-4 bg-neutral-200 rounded-full flex items-center justify-center'><FaQuestion size={10}/></div>
                                        </label>
                                        <div className="h-12 w-full border-[1px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                            <input
                                                data-test="full-name"
                                                className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                                // name="fullName" 
                                                spellCheck="false"
                                                placeholder={"Faixa etária ou categoria"}
                                                type="text"
                                                {...register(`prices.${index}.ageRange`, { pattern: /^[A-Za-z]+$/i })}
                                                // aria-invalid={errors.prices ? "true" : "false"}
                                                value={watch(`prices.${index}.ageRange`)}
                                            />
                                            
                                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                <span className="loader" />
                                            </span>
                                        </div>
                                        {(() => {
                                            const result = PricesSchema.safeParse(prices?.[index])
                                            if (!result.success) {
                                                logger.info(result.error.formErrors.fieldErrors.ageRange?.[0])
                                                const ageRangeError = result.error.formErrors.fieldErrors.ageRange?.[0]
                                                return (
                                                    <p className="min-h-5 text-xs text-red-400 flex gap-2">
                                                        {ageRangeError}
                                                    </p>
                                                )
                                            }
                                            return null
                                            })()
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
                                                placeholder={"Preço mínimo"}
                                                type="number"
                                                {...register(`prices.${index}.minPrice`, { pattern: /^[A-Za-z]+$/i })}
                                                // aria-invalid={errors.name ? "true" : "false"}
                                                value={watch(`prices.${index}.minPrice`)}
                                            />
                                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                <span className="loader" />
                                            </span>
                                        </div>
                                        {
                                            errors.prices?.[index]?.minPrice?.message &&
                                            <p className="min-h-5 text-xs text-red-400 flex gap-2 flex ">
                                                {errors?.prices?.[index]?.minPrice?.message}
                                            </p>
                                        }
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
                                                placeholder={"Preço máximo"}
                                                type="number"
                                                {...register(`prices.${index}.maxPrice`, { pattern: /^[A-Za-z]+$/i })}
                                                // aria-invalid={errors.name ? "true" : "false"}
                                                value={watch(`prices.${index}.maxPrice`)}
                                            />
                                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                <span className="loader" />
                                            </span>
                                        </div>
                                        {
                                            errors.prices?.[index]?.maxPrice?.message &&
                                            <p className="min-h-5 text-xs text-red-400 flex gap-2 flex ">
                                                { errors.prices?.[index]?.maxPrice?.message}
                                            </p>
                                        }
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
                                                placeholder={"Preço padrão"}
                                                type="number"
                                                {...register(`prices.${index}.defaultPrice`, { pattern: /^[A-Za-z]+$/i })}
                                                // aria-invalid={errors.name ? "true" : "false"}
                                                value={watch(`prices.${index}.defaultPrice`)}
                                            />
                                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                <span className="loader" />
                                            </span>
                                        </div>
                                        {
                                            errors.prices?.[index]?.defaultPrice?.message &&
                                            <p className="min-h-5 text-xs text-red-400 flex gap-2 flex ">
                                                { errors.prices?.[index]?.defaultPrice?.message}
                                            </p>
                                        }
                                    </div>
                                    </div>
                                )
                            })
                        }
                    </>
                </form>

                <CreatePriceFormTest/>
            </div>
        </div>
    )
}