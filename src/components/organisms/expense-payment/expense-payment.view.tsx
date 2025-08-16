// components/ExpensePayment.tsx

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { format } from "date-fns"
import CheckSVGAnimation from "@/assets/check-svg-animation/check-svg-animation"

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ExpensePayment({setShowModal}: Props) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentDate, setPaymentDate] = useState(() => format(new Date(), "yyyy-MM-dd"))

  function handlePay() {
    console.log("Despesa paga:", { amount, paymentMethod, paymentDate })
    // Aqui vai a lógica de pagamento
  }

  return (
    <div className="flex flex-col w-full max-w-[560px] h-full p-0  bg-white gyhd sm:rounded-2xl max-h-[90%] overflow-y-scroll">
        <Card className="h-auto w-full"
            onClick={(e) => e.stopPropagation()}
        >
        <CardHeader>
            <CardTitle>Pagar Despesa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
            <Label htmlFor="amount">Valor</Label>
            <Input
                id="amount"
                type="text"
                placeholder="R$ 0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            </div>
            <div>
            <Label htmlFor="amount">Tipo</Label>
            <Input
                id="amount"
                type="text"
                placeholder="R$ 0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            </div>
            <div className="flex flex-col">
            <Label htmlFor="amount">Notas</Label>
            <textarea
                className="border rounded-sm"
                id="amount"
                // type="text"
                placeholder="R$ 0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            </div>

            <div>
            <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
            <Select onValueChange={setPaymentMethod}>
                <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Selecione uma forma de pagamento" />
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
            <Label htmlFor="paymentDate">Data de Pagamento</Label>
            <Input
                id="paymentDate"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
            />
            </div>

            <Button className="w-full" onClick={handlePay} disabled={!amount || !paymentMethod}>
            Confirmar Pagamento
            </Button>
            <Button className="w-full bg-transparent border text-gray-900 hover:bg-transparent" onClick={() => setShowModal(false)} >
            Cancelar
            </Button>
        </CardContent>
        </Card>

    </div>
  )
}
