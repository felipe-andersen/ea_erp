// components/RefundPayment.tsx

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { format } from "date-fns"

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}


export default function RefundPayment({ setShowModal }: Props) {
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")
  const [method, setMethod] = useState("")
  const [refundDate, setRefundDate] = useState(() => format(new Date(), "yyyy-MM-dd"))

  function handleRefund() {
    if (!amount || !method || !reason) return
    console.log("Estorno realizado:", {
      amount,
      method,
      reason,
      refundDate,
    })
    // Aqui você pode chamar uma API
  }

  return (
 <div className="flex flex-col w-full max-w-[560px] h-full p-0  bg-white gyhd sm:rounded-2xl max-h-[90%] overflow-y-scroll p-6">
      <div className="space-y-1">
        <Label htmlFor="amount">Valor do Estorno</Label>
        <Input
          id="amount"
          type="text"
          placeholder="R$ 0,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="method">Forma de Estorno</Label>
        <Select onValueChange={setMethod}>
          <SelectTrigger id="method">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pix">PIX</SelectItem>
            <SelectItem value="transferencia">Transferência</SelectItem>
            <SelectItem value="cartao">Cartão</SelectItem>
            <SelectItem value="dinheiro">Dinheiro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="refundDate">Data do Estorno</Label>
        <Input
          id="refundDate"
          type="date"
          value={refundDate}
          onChange={(e) => setRefundDate(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="reason">Motivo do Estorno</Label>
        <Textarea
          id="reason"
          placeholder="Descreva o motivo do estorno"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <Button
        className="w-full mt-2"
        onClick={handleRefund}
        disabled={!amount || !method || !reason}
      >
        Confirmar Estorno
      </Button>
      <Button
        className="w-full mt-2 border bg-transparent text-black"
        onClick={() => setShowModal(false)}
      
      >
        Cancelar
      </Button>
    </div>
  )
}
