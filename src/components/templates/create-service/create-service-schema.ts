import { z } from 'zod';


export const PricesSchema = z.object({
   
    ageRange: z.string().email(),                
    minPrice: z.number().min(0).max(10000000),         
    maxPrice: z.number().min(0).max(10000000),                 
    defaultPrice: z.number().min(0).max(10000000),         
});

export const DateAndTimeSchema = z.object({
    timeZone: z.string(),
    availabilityDate: z.string(), 
    timeStart: z.string().optional(),         
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

export const CreateExperienceSchema = z.object({
    title: z.string(),
    description: z.string(),
    id: z.string(),              
    notes: z.string(),                
    prices: z.array(PricesSchema),   
    daysAndTimes: z.array(DateAndTimeSchema),   
    availableTickets:  z.number(),     
    soldTickets: z.number(),     
    remainingTickets:  z.number(),     
    minPerUser: z.number(),     
    maxPerUser:  z.number(),     
    disabled: z.boolean()     
});




