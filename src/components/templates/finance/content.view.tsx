


'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Transaction = {
  id: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  status: 'paid' | 'pending';
};

const transactions: Transaction[] = [
  { id: 1, date: '2025-07-20', description: 'Pagamento cliente A', type: 'income', amount: 2500, status: 'paid' },
  { id: 2, date: '2025-07-21', description: 'Licença de software', type: 'expense', amount: 300, status: 'paid' },
  { id: 3, date: '2025-07-22', description: 'Serviço prestado - projeto X', type: 'income', amount: 1800, status: 'pending' },
  { id: 4, date: '2025-07-23', description: 'Conta de energia', type: 'expense', amount: 420, status: 'pending' },
];

const Content =  function () {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className=" bg- p-10 ">
      <h1 className="text-2xl font-semibold">Financeiro</h1>

      {/* Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 font-bold text-xl">R$ {totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 font-bold text-xl">R$ {totalExpense.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`font-bold text-xl ${
                balance >= 0 ? 'text-green-700' : 'text-red-700'
              }`}
            >
              R$ {balance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Transações */}
      <div className="overflow-x-auto border rounded-lg bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left ">
            <tr>
              <th className="p-3 font-semibold">Data</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.description}</td>
                <td className="p-3 capitalize">{t.type === 'income' ? 'Receita' : 'Despesa'}</td>
                <td className="p-3">
                  <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    R$ {t.amount.toFixed(2)}
                  </span>
                </td>
                <td className="p-3">
                  <Badge
                    variant={t.status === 'paid' ? 'default' : 'outline'}
                    className={t.status === 'paid' ? 'bg-green-500' : 'bg-yellow-300 text-black'}
                  >
                    {t.status === 'paid' ? 'Pago' : 'Pendente'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Content;
