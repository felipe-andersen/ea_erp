
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { Icon, MinusIcon, Settings } from 'lucide-react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm, UseFormRegister, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { GeneralInfoSchema, DateAndTimesSchema, PriceSchema, transformedPriceList } from './create-service-schema';
import { capitalizeWords } from '@/shared/capitalizeWords';
import CreateDateAndTime from './create-timestamp-view';
import CreatePrice from './create-price';
import { useRouter } from 'next/navigation';



const normalizeGeneralInfo = (data?: Partial<GeneralInfoType>): GeneralInfoType => ({
  title: data?.title ?? "",
  description: data?.description ?? "",
  minPerUser: data?.minPerUser ?? '1',
  maxPerUser: data?.maxPerUser ?? 1,
  disabled: data?.disabled ?? false,
  notes: data?.notes ?? undefined,
  availableTickets: data?.availableTickets ?? undefined
});

export const defaultGeneralInfo = {
  title: "",
  description: "",
  notes: "",
  availableTickets: "",
  minPerUser: "",
  maxPerUser: "",
  disabled: false,
};

export type PriceListType = z.infer<typeof PriceSchema>[];

export type DateAndTimeListType = z.infer<typeof DateAndTimesSchema>[] | null | undefined

export type GeneralInfoType = z.infer<typeof GeneralInfoSchema>;

type FormData = {
    priceList: PriceListType
    dateAndTimeList?: DateAndTimeListType | null
    generalInfo: GeneralInfoType
};

// export let formData: FormData;

// function setFormData(data: FormData) {
//     formData = data
// };

export default function Content() {
    const [ formData, setFormData ] = useState<FormData>()
    const [ generalData, setGenaralData ] = useState({})
    const [ priceList, setPriceList ] = useState<PriceListType>([])
    const [ dateAndTimeList, setDateAndTimeList ] = useState<DateAndTimeListType>([])
    const [ submitEnabled, setSubmitEnabled ] = useState<boolean>(false)
    const [ dateAndTimeListIsValid, setDateAndTimeListIsValid ] = useState<boolean>(false)
    const [ priceListIsValid, setPriceListIsValid ] = useState<boolean>(false)
    const [ generalDataIsValid, setGeneralDataIsValid ] = useState<boolean>(false)

    const router = useRouter();

    const {
        trigger,
        reset,
        getValues,
        register,
        setValue,
        watch,
        formState: { errors, isValid, isDirty, isLoading },
        control,
    } = useForm<GeneralInfoType>({ 
        mode: 'all', 
        resolver: zodResolver(GeneralInfoSchema),
    });
  
    const prevent = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const generalInfo = useWatch({
        control
    });

     useEffect(() => {
        const checkValidity = async () => {
            const valid = await trigger();
            const result = GeneralInfoSchema.safeParse(generalInfo)
            if(!result) {
                setGeneralDataIsValid(false)
            }
            setGeneralDataIsValid(valid)
            console.log(`✅  Informações gerais ${valid ? "válidas" : "não válidas"}`, {...errors})
        };
        checkValidity()
    }, [generalInfo]);

    useEffect(() => {
        setFormData({
            priceList,
            dateAndTimeList,
            generalInfo: normalizeGeneralInfo(generalInfo)
        });
    }, [priceList, dateAndTimeList, generalInfo]);

    // console.log(generalInfo);

    const handleDateAndTimeListChange = useCallback((data: DateAndTimeListType ) => {
        setDateAndTimeList(data)
    }, []);

    const handlePriceListChange = useCallback((data: PriceListType) => {
        setPriceList(data)  
    }, []);

    console.log(`formadata`, formData)

    const handlePriceListValidityChange = useCallback((isValid: boolean) => {
        if (!isValid) {
            setPriceListIsValid(false)
            return
        } 
        setPriceListIsValid(true)
        console.log('✅  Lista de preço válida')
    }, []);

    const handleDateAndTimeListValidityChange = useCallback((isValid: boolean) => {
        if (!isValid) {
            setDateAndTimeListIsValid(false)
            console.log(`por que está vindo indefinido? form invalid `)
            return
        } 
        setDateAndTimeListIsValid(true)
        console.log('✅ Lista de data e hora válida')
    }, []);

    useEffect(() => {
            async function loadPrices() {
                try {
                    const json = await localStorage.getItem(process.env.NEXT_PUBLIC_PRICE_LIST_KEY || "");
                    if (json) {
                        const savedData = JSON.parse(json);
                       reset({...savedData.generalInfo});
                    }
                } catch (err) {
                    console.error("Erro ao carregar prices do AsyncStorage:", err);
                }
            }
            loadPrices();
        }, [reset]);
    
        useEffect(() => {
            async function savePrices() {

                const result = GeneralInfoSchema.safeParse(generalInfo)
                if (!result.success) return
                try {
                    await localStorage.setItem(process.env.NEXT_PUBLIC_PRICE_LIST_KEY || "", JSON.stringify(formData));
                    console.log("salvo no storage")
                } catch (err) {
                    console.error("Erro ao salvar prices no AsyncStorage:", err);
                }
            }
            savePrices()
        }, [generalInfo]);
        
    // useEffect(() => {
    //     async function loadPrices() {
    //         try {
    //         const json = await localStorage.getItem(process.env.NEXT_PUBLIC_PRICE_LIST_KEY || "");
    //             if (json) {
    //                 const savedPrices = JSON.parse(json);
    //                 console.log(savedPrices)
    //             }
    //         } catch (err) {
    //             console.error("Erro ao carregar prices do AsyncStorage:", err);
    //         }
    //     }
    //     loadPrices();
    // }, []);

    console.log("eu tenho o formdata" ,formData)

    const isButtonDisabled = !(priceListIsValid && dateAndTimeListIsValid && generalDataIsValid);

    const { disabled } = getValues()
    // useEffect(() => {setValue(defaultGeneralInfo)}, [])

    return (
        <div className="flex flex-col w-full bg-white overflow-y-scroll">
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
                        {errors.title && <p className="min-h-5 text-xs text-red-400 flex gap-2">{errors.title.message}</p>}
                        {/* {(() => {
                            const currentValue = watch(`description`); 
                            const result = CreateExperienceSchema.pick({ description: true }).safeParse({ title: currentValue });
                            if (!result.success) {
                                const msg = result.error.flatten().fieldErrors.description?.[0];
                                return msg ? (
                                    <p className="min-h-5 text-xs text-red-400 flex gap-2">{msg}</p>
                                ) : null;
                            }
                            return null;
                        })()} */}
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
                                {...register("description")}
                                aria-invalid={errors.description ? "true" : "false"}
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                        {
                            errors.description && <p className="min-h-5 text-xs text-red-400 flex gap-2">{errors.description.message}</p>
                        }
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
                                min={0}
                                onKeyDown={(e) => {
                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                    }
                                }}
                                {...register("availableTickets", { pattern: /^[A-Za-z]+$/i })}
                                // aria-invalid={errors.name ? "true" : "false"}
                                // value={capitalizeWords(watch('name'))}
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                        {
                            errors.availableTickets && <p className="min-h-5 text-xs text-red-400 flex gap-2">{errors.availableTickets.message}</p>
                        }
                        {/* {(() => {
                            const currentValue = watch(`availableTickets`); 
                            const result = CreateExperienceSchema.safeParse(currentValue);

                            if (!result.success) {
                                const fieldError = result.error.formErrors.fieldErrors.availableTickets
                                return fieldError ? (
                                <p className="min-h-5 text-xs text-red-400 flex gap-2">
                                    {fieldError}
                                </p>
                                ) : null;
                            }
                            return null;
                            }
                        )()} */}
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
                                onKeyDown={(e) => {
                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                    }
                                }}
                                type="number"
                                {...register("minPerUser",  { pattern: /^[A-Za-z]+$/i})}
                                aria-invalid={errors.minPerUser ? "true" : "false"}
                               
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                        {
                            errors.minPerUser && <p className="min-h-5 text-xs text-red-400 flex gap-2">{errors.minPerUser.message}</p>
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
                                min={0}
                                onKeyDown={(e) => {
                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                    }
                                }}
                                {...register("maxPerUser", { pattern: /^[A-Za-z]+$/i })}
                                aria-invalid={errors.maxPerUser ? "true" : "false"}
                               
                            />
                            <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span>
                        </div>
                        {
                            errors.maxPerUser && <p className="min-h-5 text-xs text-red-400 flex gap-2">{errors.maxPerUser.message}</p>
                        }
                    </div>
                    <div className={`flex flex-col`}>
                        <label className="text-sm font-medium text-gray-700">
                            Status
                        </label>
                        {/* <DisableToggle enabled={watch('disabled')} setEnabled={() => setValue('disabled', !watch('disabled'), { shouldValidate: true })}/> */}
                        <DisableToggle namelabel='Habilitado' name='disabled' register={register} isDisabled={disabled}/>
                    </div>
                    <div className='gap-1 h-min mb-4 flex flex-col'>
                        <label className="text-sm font-medium text-gray-700">
                            <span className="text-red-600">*</span> 
                            Notas
                        </label>
                        <div className="h-20 w-full border h-min border-zinc-200 flex rounded-lg items-center hover:border-zinc-400 p-3">
                            <textarea
                                data-test="full-name"
                                className="text-sm w-full h-20 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                // name="fullName" 
                                spellCheck="false"
                                // type="text"
                                {...register("notes", { pattern: /^[A-Za-z]+$/i })}
                                aria-invalid={errors.notes ? "true" : "false"}
                               
                            />
                            {/* <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                <span className="loader" />
                            </span> */}
                        </div>
                        {
                            errors.notes && <p className="min-h-5 text-xs text-red-400 flex gap-2">{errors.notes.message}</p>
                        }
                    </div>
                </div>
                <hr className="my-3"/>
                {/* Prices */}
                <CreatePrice onChange={handlePriceListChange} onPriceListValidityChange={handlePriceListValidityChange}/>
                <hr className="my-5"/>
                {/* Dates and times */}
                <CreateDateAndTime onChange={handleDateAndTimeListChange} onDateAndTimeListValidityChange={handleDateAndTimeListValidityChange}/>
                <span className='mt-6 flex gap-3'>
                    <button
                    disabled={isButtonDisabled}
                    onClick={() => {}} 
                    className='w-full bg-blue-900 text-white font-medium h-10 rounded-sm text-sm disabled:bg-gray-500 disabled:cursor-not-allowed'>Cadastrar</button>
                    <button 
                    onClick={() => router.push("/dashboard/products")}
                    className=' w-full border font-medium h-10 rounded-sm text-sm'>Cancelar</button>
                </span>
            </div>
        </div>
    )
};

type DisableToggleType = {
    isDisabled: boolean
    namelabel: string
    name: string;
    register: ReturnType<any>;
};

export function DisableToggle({ namelabel, name, register, isDisabled }: DisableToggleType) {
const { ref, onChange, onBlur, name: inputName } = register(name);
    return (
        <div className="flex flex-col gap-4 py-3">
            <label className="flex items-center cursor-pointer justify-between w-full">
                <span className="text-sm text-gray-900">
                    Desabilitar
                </span>
                <div className="relative">
                    <input
                        name={name}
                        type="checkbox"
                        ref={ref}
                        onChange={onChange}
                        className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${isDisabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        isDisabled ? 'translate-x-5' : ''
                        }`}
                    ></div>
                </div>
            </label>
        </div>
    )
}
