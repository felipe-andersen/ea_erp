
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { CircleAlertIcon, Icon, MinusIcon, Settings } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Controller, FieldArrayMethodProps, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateExperienceSchema, PricesSchema } from './create-service-schema';
import { capitalizeWords } from '@/shared/capitalizeWords';
import logger from '@/lib/pino';
import { FaQuestion } from 'react-icons/fa6';
import InputMask from 'react-input-mask'
import Decimal from 'decimal.js'
import { NumericFormat } from 'react-number-format'
import CurrencyInput from 'react-currency-input-field';


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
   
    ageRange: 'general', 
    minPrice: 450,
    maxPrice: 462,
    defaultPrice: 454
};

const PricesFormSchema = z.object({
    prices: z.array(PricesSchema)
});




type PricesFormType = z.infer<typeof PricesFormSchema>

type PricesType = z.infer<typeof PricesSchema>;

export default function CreatePriceFormTest() {

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

        const { fields:pricesField, append:priceAppend, remove:priceRemove } = useFieldArray({control, name:'prices'})
    
        const prevent = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        };
    let fdf:FieldArrayMethodProps

    const handlePriceAppend = function (e: FormEvent) {
        e.preventDefault();
      
    }


    
    return (
        <div className="flex flex-col w-full bg-red-0">
            <div className="max-w-[600px]">
                <h2 className='mb-3 font-bold text-xl'>Preços</h2>
                <button className='h-10 px-3 mb-3 text-sm  font-medium bg-neutral-200 rounded'
                    onClick={() => priceAppend(newPriceRange, {shouldFocus: true, focusName: 'ageRange'})}
                >
                    Adicionar
                </button>
                <form className='border rounded-sm p-6'>
                    <>
                        {pricesField.map((obj, index) => {
                            return (
                                <div>
                                    {Object.entries(obj).map(([key, value], index) =>{ 
                                        const keyTyped = key as keyof PricesType;
                                        const fieldName = `prices.${index}.${keyTyped}` as const;
                                        return (
                                            <Controller
                                                key={fieldName}
                                                name={fieldName}
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <label className="block mb-1 font-medium">{key === "ageRange" ? "Faixa etária" : "Outro"}</label>
                                                        {typeof obj[key as keyof typeof obj] !== "number" ? (
                                                            <input
                                                                {...field}
                                                                type="text"
                                                                className="border rounded px-3 py-2 w-full"
                                                            />
                                                            ) : (
                                                            <NumericFormat
                                                                {...field}
                                                                thousandSeparator="."
                                                                decimalSeparator=","
                                                                decimalScale={2}
                                                                fixedDecimalScale
                                                                allowNegative={false}
                                                                className="border rounded px-3 py-2 w-full"
                                                                onValueChange={(values) => {
                                                                    console.log(values)
                                                                    field.onChange(values.floatValue ?? 0)
                                                                }}
                                                                placeholder="0,00"
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </>
                </form>
            </div>
        </div>
    )
}

