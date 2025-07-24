'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type CreditRequest = {
  id: number;
  amount: number;
  status: 'Aprovado' | 'Pendente' | 'Recusado';
  date: string;
  purpose: string;
};

const creditRequests: CreditRequest[] = [
  {
    id: 1,
    amount: 20000,
    status: 'Aprovado',
    date: '2025-07-10',
    purpose: 'Expansão da equipe de vendas',
  },
  {
    id: 2,
    amount: 15000,
    status: 'Pendente',
    date: '2025-07-21',
    purpose: 'Compra de equipamentos',
  },
];

export default function CreditPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Crédito para Crescer</h1>
        <p className="text-muted-foreground">
          Acesse linhas de crédito para expandir seu negócio com segurança e praticidade.
        </p>
        <Button className="mt-2">Verificar condições</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Minhas Solicitações</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Data</th>
                <th className="p-3">Valor</th>
                <th className="p-3">Finalidade</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {creditRequests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="p-3">{req.date}</td>
                  <td className="p-3">R$ {req.amount.toLocaleString()}</td>
                  <td className="p-3">{req.purpose}</td>
                  <td className="p-3">
                    <Badge
                      className={
                        req.status === 'Aprovado'
                          ? 'bg-green-500'
                          : req.status === 'Pendente'
                          ? 'bg-yellow-400 text-black'
                          : 'bg-red-400'
                      }
                    >
                      {req.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
