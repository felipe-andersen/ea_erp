'use client'
import BaggageVolume from "@/components/templates/baggage-volume/baggage-volume.view";
import { Product } from "@/components/templates/product/product.view";
import { useParams } from "next/navigation";


const productName = 'ticket'

function Comp () {
    
}

export default function ProductPage() {
    const { product } = useParams<{ product: string }>();

    if (product === "baggage-volume") {
        return <BaggageVolume />;
    }

    if (product === "tickets") {
        return <BaggageVolume />;
    }

    return <Product productName={productName}/>; 
}
