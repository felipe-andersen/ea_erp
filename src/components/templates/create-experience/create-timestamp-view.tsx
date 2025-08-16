
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { CircleAlertIcon, Icon, MinusIcon, Settings } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Controller, FieldArrayMethodProps, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { DateAndTimesSchema } from './create-service-schema';
import { capitalizeWords } from '@/shared/capitalizeWords';
import logger from '@/lib/pino';
import { FaQuestion } from 'react-icons/fa6';
import CreatePriceFormTest from './create-price';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { TimeZoneEnum } from './create-timestamp-model';


type DateAndTimesType = z.infer<typeof DateAndTimesSchema>;

const DateAndTimesFormSchema = z.object({
    dateAndTimes: z.array(DateAndTimesSchema).nullish()
});

type DateAndTimesFormType = z.infer<typeof DateAndTimesFormSchema>;

function formatDateToYYYYMMDD(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

const today = new Date();

const newDateAndTimes = {
    timeZone: 'UTC (UTC+00:00)',
    availabilityDate: formatDateToYYYYMMDD(today),
    timeStart: '12:00',      
    timeEnd: '12:00',
};

enum LabelsEnum {
    TIMEZONE = 'timeZone',
    AVAILABILITYDATE = 'availabilityDate',
    TIMESTART = 'timeStart',
    TIMEEND = 'timeEnd'
};

const inputLabel = {
    [LabelsEnum.AVAILABILITYDATE] : "Date",
    [LabelsEnum.TIMESTART] : "Start Time",
    [LabelsEnum.TIMEEND] : "End Time",
    [LabelsEnum.TIMEZONE] : "Time Zone"
};

function getInputLabel (label: LabelsEnum) {
    return inputLabel[label]
};

function isLabelsEnum(value: string): value is LabelsEnum {
    return Object.values(LabelsEnum).includes(value as LabelsEnum);
};

type DateAndTimeType = z.infer<typeof DateAndTimesSchema>;

type CreateDateAndTimeType = {
    onChange: (data: DateAndTimeType[] | null | undefined ) => void;
    onDateAndTimeListValidityChange: (isValid: boolean) => void;
}

export default function CreateDateAndTime({onChange, onDateAndTimeListValidityChange}: CreateDateAndTimeType) {

    const [ dateAndTimeValues ] = useState<DateAndTimesType[]>([]);

    const {
        trigger,
        reset,
        register,
        getValues,
        getFieldState,
        watch,
        formState: { errors, isDirty, isLoading },
        control,
    } = useForm<DateAndTimesFormType>({ 
            mode: 'onChange', 
        resolver: zodResolver(DateAndTimesFormSchema),
        // defaultValues: {
        //     dateAndTimesList: dateAndTimeValues
        // }
    });

    const dateAndTimeList = useWatch({
        control,
        name: 'dateAndTimes'
    })

    useEffect(() => {
        async function loadPrices() {
            try {
                const json = await localStorage.getItem(process.env.NEXT_PUBLIC_PRICE_LIST_KEY || "");
                if (json) {
                    const savedData = JSON.parse(json);
                    reset({ dateAndTimes: savedData.dateAndTimeList });
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
    //             await localStorage.setItem("dateAndTimeList_key", JSON.stringify(dateAndTimeList));
    //             console.log("salvo no storage")
    //         } catch (err) {
    //             console.error("Erro ao salvar prices no AsyncStorage:", err);
    //         }
    //     }
    //     if (dateAndTimeList) {
    //         savePrices();
    //     }
    // }, [dateAndTimeList]);

    console.log(dateAndTimeList)
    console.log(getValues())

   const dateAndTimesList = watch("dateAndTimes");

    useEffect(() => {
        const parsed = z.array(DateAndTimesSchema).safeParse(dateAndTimeList);

        if (parsed.success) {
            process.env.NODE_ENV !== 'production' && console.log("✅ Array validado:", parsed.data);
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.log("❌ Erros de validação:", parsed.error.format());
            }
        }
    }, [dateAndTimesList]);

    const { fields: dateAndTimesFields, append: dateAndTimesAppend, remove: dateAndTimeRemove } = useFieldArray({control, name:'dateAndTimesList'});

    const prevent = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handlePriceAppend = function (e: FormEvent) {
        e.preventDefault()
    };

    function getInputType(key: string): 'time' | 'date' | 'text' {
        switch (key) {
            case 'timeStart':
                return 'time';
            case 'timeEnd':
                return 'time';
            case 'availabilityDate':
                return 'date';
            default:
                return 'text';
        }
    };

     useEffect(() => {
        const checkValidity = async () => {
            const valid = await trigger();
            console.log(valid ? `` : errors)
            onDateAndTimeListValidityChange(valid);
        };
        checkValidity();
    }, [dateAndTimeList]);

    useEffect(()=> {
        onChange(dateAndTimeList)
    }, [dateAndTimeList, onChange])

    return (
        <div className="flex flex-col w-full bg-red-0">
            <div className="max-w-[600px]">
                <h2 className='mb-3 font-bold text-xl'>Datas e horários</h2>
                <button className='h-10 px-3 mb-3 text-sm  font-medium bg-neutral-200 rounded'
                    onClick={() => dateAndTimesAppend(newDateAndTimes, {shouldFocus: true, focusName: 'timeZone'})}
                >
                    Adicionar
                </button>
                <form className=''>
                    <>
                        {
                            dateAndTimesFields.map((DateAndTimesField, index) => {
                                return (
                                    <div className="relative border rounded-md p-5 mb-6">
                                        {/* {
                                            dateAndTimeFields.length > 1 && 
                                            <button
                                                className="absolute rounded-full w-8 h-8 flex items-center justify-center border-[1px] -mt-4 ml-[calc(100%-40px)]  border bg-white"
                                                onClick={() => dateAndTimeRemove(index)}
                                            >
                                                <MinusIcon size={20}/>
                                            </button>
                                        } */}
                                        <div key={index}>
                                            {Object.entries(DateAndTimesField).filter(([key]) => key !== "id").map(([fieldKey, value], DateAndTimeFieldIdx) =>{ 
                                                const keyTyped = fieldKey as keyof DateAndTimesType;
                                                const fieldName = `dateAndTimes.${index}.${keyTyped}` as const;
                                                const labelEnumKey = fieldKey
                                                const label = isLabelsEnum(labelEnumKey) ? getInputLabel(labelEnumKey) : fieldKey;
                                                const field = fieldName.split('.').at(-1);

                                                return (
                                                    <>
                                                        <div key={DateAndTimeFieldIdx} className='gap-1 h-min mb-4 flex flex-col'>
                                                            <label className="text-sm font-medium text-gray-700">
                                                                {
                                                                    field === 'availabilityDate' ?
                                                                        <span                   className="text-red-600">*</span>  :
                                                                        <></>
                                                                }
                                                                {label}
                                                            </label>
                                                            <div className="h-12 w-full border-[1px] border-zinc-200 flex rounded-lg items-center hover:border-zinc-400">
                                                                {
                                                                    field === 'timeZone' ? 
                                                                    <select 
                                                                        {...register(fieldName)} 
                                                                        className='w-full h-full bg-transparent px-3 mr-3 outline-none'
                                                                        // value={field === 'timeZone' ? watch(fieldName) : "UTC (UTC+00:00)"}
                                                                    >
                                                                        {
                                                                            Object.entries(TimeZoneEnum).map(([key, value]) => (
                                                                                <option 
                                                                                    key={key} value={value}
                                                                                >
                                                                                    {value}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    :
                                                                    <input
                                                                        data-test="full-name"
                                                                        className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                                                        // name="fullName" 
                                                                        spellCheck="false"
                                                                        // placeholder={"Ricardo Albuquerque"}
                                                                        {...register(fieldName)}
                                                                        type={getInputType(fieldKey)}
                                                                        // aria-invalid={errors.name ? "true" : "false"}
                                                                        // value={watch(fieldName)}
                                                                    />
                                                                }
                                                                <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                                    <span className="loader" />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                {validationMessage(errors, index, keyTyped)}
                                                            </div> 
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                </form>
            </div>
        </div>
    )
}


// export const validationMessage = function (
//   field: keyof DateAndTimeType,
//   dateAndTime: DateAndTimeType
// ) {
//   const validation = DateAndTimeSchema.safeParse(dateAndTime);

//   if (!validation.success) {
//     const errors = validation.error.formErrors.fieldErrors;

//     switch (field) {
//       case "availabilityDate":
//         if (errors.availabilityDate?.length) {
//           return <div>{errors.availabilityDate[0]}</div>;
//         }
//         break;

//       case "timeZone":
//         if (errors.timeZone?.length) {
//           return <div>{errors.timeZone[0]}</div>;
//         }
//         break;

//       case "timeStart":
//         if (errors.timeStart?.length) {
//           return <div>{errors.timeStart[0]}</div>;
//         }
//         break;

//       case "timeEnd":
//         if (errors.timeEnd?.length) {
//           return <div>{errors.timeEnd[0]}</div>;
//         }
//         break
//     }
//   }

//   return null
// };

import { FieldErrors } from "react-hook-form";
import { json } from 'stream/consumers';

export function validationMessage(
  errors: FieldErrors<DateAndTimesFormType>,
  index: number,
  field: keyof DateAndTimesType
) {
  const fieldError = errors?.dateAndTimes?.[index]?.[field];

  if (!fieldError) return null;

  // React-hook-form pode guardar mensagem em diferentes formatos
  if (typeof fieldError.message === "string") {
    return <div>{fieldError.message}</div>;
  }

  return null;
}


const SelectInput = function () {
    return ( 
       <select className='w-full h-full bg-transparent px-3 mr-3 outline-none'>
            {
                Object.entries(TimeZoneEnum).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                ))
            }
        </select>
    )
}

function unixTimestampToHour(timestamp: number): string {
  const date = new Date(timestamp * 1000); // converte para milissegundos
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}


export function timeToUnixTimestamp(time: string, baseDate = new Date()): number {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return Math.floor(date.getTime() / 1000);
}

const time = "16:40";
const timestamp = timeToUnixTimestamp(time);
console.log(timestamp);
