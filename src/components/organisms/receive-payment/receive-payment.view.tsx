// components/ReceivePayment.tsx

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { format } from "date-fns"

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ReceivePayment({ setShowModal }: Props) {
  const [amount, setAmount] = useState("")
  const [receivedBy, setReceivedBy] = useState("")
  const [receiveDate, setReceiveDate] = useState(() => format(new Date(), "yyyy-MM-dd"))

  function handleReceive() {
    console.log("Recebimento registrado:", {
      amount,
      receivedBy,
      receiveDate,
    })
    // Aqui você pode integrar com sua API ou sistema
  }

  return (
     <div className="flex flex-col w-full max-w-[560px] h-full p-0  bg-white gyhd sm:rounded-2xl max-h-[90%] overflow-y-scroll">
    <Card className="w-full h-auto">
      <CardHeader className="h-auto w-full">
        <CardTitle>Receber Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="amount">Valor Recebido</Label>
          <Input
            id="amount"
            type="text"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="amount">Pagador</Label>
          <Input
            id="amount"
            type="text"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <Label htmlFor="amount">Notas</Label>
          <textarea
            id="amount"
            className="border"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="receivedBy">Forma de Recebimento</Label>
          <Select onValueChange={setReceivedBy}>
            <SelectTrigger id="receivedBy">
              <SelectValue placeholder="Escolha o método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pix">PIX</SelectItem>
              <SelectItem value="boleto">Boleto</SelectItem>
              <SelectItem value="transferencia">Transferência</SelectItem>
              <SelectItem value="cartao">Cartão</SelectItem>
              <SelectItem value="dinheiro">Dinheiro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="receiveDate">Data de Recebimento</Label>
          <Input
            id="receiveDate"
            type="date"
            value={receiveDate}
            onChange={(e) => setReceiveDate(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleReceive} disabled={!amount || !receivedBy}>
          Confirmar Recebimento
        </Button>
         <Button className="w-full bg-transparent border text-gray-900 hover:bg-transparent" onClick={() => setShowModal(false)} >
            Cancelar
            </Button>
      </CardContent>
    </Card>
    </div>
  )
}
