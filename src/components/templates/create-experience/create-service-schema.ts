import { z } from 'zod';


export const PriceSchema = z.object({
    ageRange: z.string().email().min(1).max(100),             
    minPrice: z.string().min(1).max(10000000),        
    maxPrice: z.string().min(1).max(10000000), 
    defaultPrice: z.string().min(1).max(10000000) 
});

export let transformedPriceList = z.array(PriceSchema).transform((data) => {
    return data.map((price) => ({
        ...price,
        minPrice: Number(price.minPrice),
        maxPrice: Number(price.maxPrice),
        defaultPrice: Number(price.defaultPrice)
    }))
})

export const DateAndTimesSchema = z.object({
    timeZone: z.string(),
    // availabilityDate: z.preprocess((val) => {
    //     if (typeof val === 'string' || val instanceof Date) {
    //     const parsed = new Date(val);
    //     return isNaN(parsed.getTime()) ? undefined : parsed;
    //     }
    //     return undefined;
    // }, z.date())
    // .transform((date) => Math.floor(date.getTime() / 1000)),
    availabilityDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
    timeStart: z.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida")
        .optional(),
    timeEnd: z.string().optional(),             
    // totalTickets?: number
    // ticketsSold?: number
    // minPerUser?: number
    // maxPerUser?: number
    // notes: z.string().optional().nullable()
    // ageRange?: string 
    // prices: {
    //     id: string
    //     ageRange: string 
    //     minPrice: number,
    //     maxPrice: number,
    //     defaultPrice?: number
    // }[]
})

export const GeneralInfoSchema = z.object({
    title: z.string().min(1).max(400),
    description: z.string().min(1).max(400),
    // id: z.string(),              
    notes: z.string().max(1000).optional(),                
    availableTickets: z.string().transform((val) => Number(val)).nullable().optional(),     
    // soldTickets: z.string().transform((val) => Number(val)),     
    // remainingTickets:  z.string().transform((val) => Number(val)).nullable(),     
    minPerUser: z
    .string()
    .min(1, "Deve ter pelo menos 1 caractere"),
    maxPerUser:  z.string().min(1).max(1000000000).transform((val) => Number(val)),   
    disabled: z.boolean()
});




