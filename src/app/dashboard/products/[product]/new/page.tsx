
'use client'
import BaggageVolume from "@/components/templates/sell-baggage-volume/sell-baggage-volume.view";
import { Ticket } from "@/components/templates/ticket/ticket.view";
import { useParams } from "next/navigation";


export default function ProductPage() {
    const { product } = useParams<{ product: string }>();

    if (product === "baggage-volume") {
        return <BaggageVolume />
    }

    if (product === "ticket") {
        return <Ticket />
    }
}
