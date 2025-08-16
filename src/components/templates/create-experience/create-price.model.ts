
import { DateAndTimeListType, PriceListType } from "./content.view";
import { z } from 'zod';
import { PriceSchema } from './create-service-schema';
import { PriceType } from "./create-price";


const PricesFormSchema = z.object({
    prices: z.array(PriceSchema)
  .transform((prices) =>
    prices.map((p) => ({
      ...p,
      minPrice: Number(p.minPrice),
      maxPrice: Number(p.maxPrice),
      defaultPrice: Number(p.defaultPrice)
    }))
  )
});

export class CreatePriceModel {
    priceList: PriceListType;
    dateAndTimeList?: DateAndTimeListType;

    constructor(data: {
        priceList: PriceListType;
        dateAndTimeList?: DateAndTimeListType;
    }) {
        this.priceList = data.priceList
        this.dateAndTimeList = data.dateAndTimeList
     }

    model() {
        const arr = this.priceList
        
    }

    toJSON() {
        // chamar uma rota e mandar para o backend
        return {
        price_list: this.priceList,
        available_dates: this.dateAndTimeList
        };
    }

    send() {

    }

}
