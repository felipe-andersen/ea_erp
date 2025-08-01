
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { CircleAlertIcon, Icon, MinusIcon, Settings } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Controller, FieldArrayMethodProps, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateExperienceSchema, DateAndTimeSchema, PricesSchema } from './create-service-schema';
import { capitalizeWords } from '@/shared/capitalizeWords';
import logger from '@/lib/pino';
import { FaQuestion } from 'react-icons/fa6';
import CreatePriceFormTest from './cptest.view';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { TimeZoneEnum } from './create-timestamp-model';

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
};

const newDateAndTime = {
    timeZone: 'UTC (UTC+00:00)',
    availabilityDate: Math.floor(new Date().getHours() / 100),
    timeStart: '00:00',      
    timeEnd: '00:00',
};

const DateAndTimeFormSchema = z.object({
    dateAndTime: z.array(DateAndTimeSchema)
});

type DateAndTimeFormType = z.infer<typeof DateAndTimeFormSchema>;

type DateAndTimeType = z.infer<typeof DateAndTimeSchema>;

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

export default function CreateDateAndTimeForm() {

    const [ dateAndTimeValues ] = useState<DateAndTimeType[]>([]);

    const {
        register,
        getValues,
        getFieldState,
        watch,
        formState: { errors, isValid, isDirty, isLoading },
        control,
        } = useForm<DateAndTimeFormType>({ 
             mode: 'onChange', 
            resolver: zodResolver(DateAndTimeFormSchema),
            defaultValues: {
                dateAndTime: dateAndTimeValues
            }
        });

    const { dateAndTime } = getValues();

    const { fields: dateAndTimeFields, append: dateAndTimeAppend, remove: dateAndTimeRemove } = useFieldArray({control, name:'dateAndTime'});

    const prevent = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handlePriceAppend = function (e: FormEvent) {
        e.preventDefault()
    };

    function getInputType(key: string): 'time' | 'date' | 'text' {
        switch (key) {
            case 'timeStart':
            case 'timeEnd':
                return 'time';
            case 'availabilityDate':
                return 'date';
            default:
                return 'text';
        }
    };

    return (
        <div className="flex flex-col w-full bg-red-0">
            <div className="max-w-[600px]">
                <h2 className='mb-3 font-bold text-xl'>Datas e horários</h2>
                <button className='h-10 px-3 mb-3 text-sm  font-medium bg-neutral-200 rounded'
                    onClick={() => dateAndTimeAppend(newDateAndTime, {shouldFocus: true, focusName: 'timeZone'})}
                >
                    Adicionar
                </button>
                <form className=''>
                    <>
                        {
                            dateAndTimeFields.map((DateAndTimeField, index) => {
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
                                            {Object.entries(DateAndTimeField).filter(([key]) => key !== "id").map(([fieldKey, value], i) =>{ 
                                                const keyTyped = fieldKey as keyof DateAndTimeType;
                                                const fieldName = `dateAndTime.${index}.${keyTyped}` as const;

                                                const labelEnumKey = fieldKey
                                                const label = isLabelsEnum(labelEnumKey) ? getInputLabel(labelEnumKey) : fieldKey;
                                                const field = fieldName.split('.').at(-1);
                                                return (
                                                    <>
                                                        <div key={fieldKey} className='gap-1 h-min mb-4 flex flex-col'>
                                                            <label className="text-sm font-medium text-gray-700">
                                                                {
                                                                    field === 'availabilityDate' ?
                                                                        <span className="text-red-600">*</span>  :
                                                                        <></>
                                                                }
                                                                {label}
                                                            </label>
                                                            <div className="h-12 w-full border-[1px] border-zinc-200 flex rounded-lg items-center hover:border-zinc-400">
                                                                {
                                                                    field === 'timeZone' ? <SelectInput/>
                                                               
                                                                :
                                                                    <input
                                                                        data-test="full-name"
                                                                        className="text-sm w-full h-full px-3 outline-none bg-transparent placeholder:text-neutral-400 outline-none placeholder:text-sm"
                                                                        // name="fullName" 
                                                                        spellCheck="false"
                                                                        // placeholder={"Ricardo Albuquerque"}
                                                                        {...register(fieldName, { pattern: /^[A-Za-z]+$/i })}
                                                                        type={getInputType(fieldKey)}
                                                                        // aria-invalid={errors.name ? "true" : "false"}
                                                                        // value={watch(`prices.${index}.defaultPrice`)}
                                                                        
                                                                    />
                                                                }
                                                                
                                                                <span className="h-10 hidden w-10 scale-90 flex items-center justify-center ">
                                                                    <span className="loader" />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                {validationMessage(keyTyped, DateAndTimeField)}
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






export const validationMessage = function (
  field: keyof DateAndTimeType,
  dataEndTime: DateAndTimeType
) {
  const validation = DateAndTimeSchema.safeParse(dataEndTime);

  if (!validation.success) {
    const errors = validation.error.formErrors.fieldErrors;

    switch (field) {
      case "availabilityDate":
        if (errors.availabilityDate?.length) {
          return <div>{errors.availabilityDate[0]}</div>;
        }
        break;

      case "timeZone":
        if (errors.timeZone?.length) {
          return <div>{errors.timeZone[0]}</div>;
        }
        break;

      case "timeStart":
        if (errors.timeStart?.length) {
          return <div>{errors.timeStart[0]}</div>;
        }
        break;

      case "timeEnd":
        if (errors.timeEnd?.length) {
          return <div>{errors.timeEnd[0]}</div>;
        }
        break
    }
  }

  return null
};

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
