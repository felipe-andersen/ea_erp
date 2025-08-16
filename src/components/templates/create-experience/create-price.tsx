
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent, useEffect, useState } from 'react';
import { Controller, FieldArrayMethodProps, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { PriceSchema } from './create-service-schema';
import { capitalizeWords } from '@/shared/capitalizeWords';
import logger from '@/lib/pino';
import { FaQuestion } from 'react-icons/fa6';
import InputMask from 'react-input-mask'
import Decimal from 'decimal.js'
import { NumericFormat } from 'react-number-format'
import CurrencyInput from 'react-currency-input-field';
import { UseFormRegister, UseFieldArrayRemove, UseFieldArrayAppend, FieldArrayWithId, FieldErrors } from "react-hook-form";



const newPriceRange = {
    ageRange: '', 
    minPrice: 'R$ 0,00',
    maxPrice: 'R$ 0,00',
    defaultPrice: 'R$ 0,00'
};

const PricesFormSchema = z.object({
    prices: z.array(PriceSchema)
//   .transform((prices) =>
//     prices.map((p) => ({
//       ...p,
//       minPrice: Number(p.minPrice),
//       maxPrice: Number(p.maxPrice),
//       defaultPrice: Number(p.defaultPrice)
//     }))
//   )
});

type PricesFormType = z.infer<typeof PricesFormSchema>;

export type PriceType = z.infer<typeof PriceSchema>;

type CreatePriceType = {
    onChange: (data: PriceType[]) => void
    onPriceListValidityChange:  (isValid: boolean) => void;
};

const priceListKey = process.env.NEXT_PUBLIC_PRICE_LIST_KEY || "";

export default function CreatePrice({onChange, onPriceListValidityChange}:CreatePriceType) {

    const {
        handleSubmit,
        setValue,
        reset,
        trigger,
        register,
        getValues,
        getFieldState,
        watch,
        formState: { errors, isDirty, isLoading },
        control,
    } = useForm<PricesFormType>({ 
            mode: 'onChange', 
        resolver: zodResolver(PricesFormSchema),
        defaultValues: {
            prices: [
                newPriceRange
            ]
        }
    });

    const priceList = useWatch({
        control,
        name: "prices",
    });

    useEffect(() => {
        async function loadPrices() {
            try {
                const json = await localStorage.getItem(process.env.NEXT_PUBLIC_PRICE_LIST_KEY || "");
                if (json) {
                    const savedData = JSON.parse(json);
                    reset({ prices: savedData.priceList });
                }
            } catch (err) {
                console.error("Erro ao carregar prices do AsyncStorage:", err);
            }
        }
        loadPrices();
    }, [reset]);

    // useEffect(() => {
    //     async function savePrices() {
    //         try {
    //             await localStorage.setItem(priceListKey, JSON.stringify(priceList));
    //             console.log("salvo no storage")
    //         } catch (err) {
    //             console.error("Erro ao salvar prices no AsyncStorage:", err);
    //         }
    //     }
    //     if (priceList) {
    //         savePrices();
    //     }
    // }, [priceList]);

    // console.log(priceList)
    // console.log(getValues())

    useEffect(() => {
        const parsed = z.array(PriceSchema).safeParse(priceList);

        if (parsed.success) {
            process.env.NODE_ENV !== 'production' && console.log("✅ Lista de preços validada com zod:", parsed.data);
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.log("❌ Erros de validação (zod):", parsed.error.format());
            }
        }
    }, [priceList]);

    const { fields, append, remove } = useFieldArray({control, name:'prices'});

    const prevent = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    };

    useEffect(()=> {
        onChange?.(priceList)
    }, [priceList, onChange])

    useEffect(() => {
        const checkValidity = async () => {
            const valid = await trigger("prices");
            console.log(valid ? `` : errors)
            onPriceListValidityChange(valid);
        };
        checkValidity();
    }, [priceList]);

    return (
        <div className="flex flex-col w-full bg-red-0">
            <div className="max-w-[600px]">
                <h2 className='mb-3 font-bold text-xl'>Preços</h2>
                <button className='h-10 px-3 mb-3 text-sm  font-medium bg-neutral-200 rounded'
                    onClick={() => append(newPriceRange, { shouldFocus: true, focusName: 'ageRange'})}
                >
                    Adicionar
                </button>
                <form className=''>
                    <>
                        {fields.map((field, index) => {
                            return (
                                <div key={index} className='border mb-5 p-4 rounded-xl'>
                                    {Object.entries(field).filter(([key]) => key !== "id").map(([key, value], keyIndex) =>{ 
                                        const keyTyped = key as keyof PriceType;
                                        const fieldName = `prices.${index}.${keyTyped}` as const;
                                        return (
                                            <div key={keyIndex}>
                                                <div className='gap-1 h-min mb-4 flex flex-col'>
                                                    <label className="text-sm font-medium text-gray-700 flex gap-1">
                                                        <span className="text-red-600">*</span> 
                                                        {NameLabelProvider(key)}
                                                        <div className='h-4 w-4 bg-neutral-200 rounded-full flex items-center justify-center'>
                                                            <FaQuestion size={10}/>
                                                        </div>
                                                    </label>
                                                    <div className="h-12 w-full border-[1px] border-zinc-200 flex rounded-lg  items-center hover:border-zinc-400">
                                                        <input
                                                            data-test="full-name"
                                                            className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                                            // name="fullName" 
                                                            spellCheck="false"
                                                            placeholder={"Faixa etária ou categoria"}
                                                            type="text"
                                                           defaultValue={keyTyped !== "ageRange" ? "R$ 0,00" : ""}
                                                           {...register(fieldName, {
                                                            
                                                                onChange(event) {
                                                                    let inputValue = event.target.value;
                                                                    let numbersOnly = inputValue.replace(/\D/g, "");
                                                                    let decimalValue = (Number(numbersOnly) / 100).toFixed(2);
                                                                    let formattedValue = new Intl.NumberFormat("pt-BR", {
                                                                        style: "currency",
                                                                        currency: "BRL",
                                                                    }).format(Number(decimalValue));
                                                                    keyTyped !== "ageRange" &&
                                                                    setValue(fieldName, formattedValue, {
                                                                        shouldValidate: true,
                                                                        shouldDirty: true,
                                                                    })
                                                                }
                                                            })}

                                                            aria-invalid={!!errors.prices?.[index]?.[keyTyped]}
                                                            // defaultValue={watch(fieldName)}
                                                        />
                                                        <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                            <span className="loader" />
                                                        </span>
                                                    </div>
                                                    {(() => {
                                                        const currentValue = watch(`prices.${index}`); // pega o valor atual
                                                        const result = PriceSchema.safeParse(currentValue);

                                                        if (!result.success) {
                                                            const fieldError = result.error.formErrors.fieldErrors[keyTyped]?.[0];
                                                            return fieldError ? (
                                                            <p className="min-h-5 text-xs text-red-400 flex gap-2">
                                                                {fieldError}
                                                            </p>
                                                            ) : null;
                                                        }
                                                        return null;
                                                        }
                                                    )()}
                                                </div>
                                            </div>
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


function NameLabelProvider(key: string) {
   switch (key) {
    case "ageRange": 
        return "Faixa etária"
    case "minPrice": 
        return 'Preço mínimo'
    case "maxPrice": 
        return 'Preço máximo'
    case "defaultPrice": 
        return 'Preço padrão'
   }
}
