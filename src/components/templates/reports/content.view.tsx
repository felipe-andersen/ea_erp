

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type ReportRow = {
  id: number;
  period: string;
  description: string;
  category: string;
  value: number;
};

const reportData: ReportRow[] = [
  { id: 1, period: 'Julho 2025', description: 'Faturamento total', category: 'Financeiro', value: 15420.75 },
  { id: 2, period: 'Julho 2025', description: 'Novos clientes', category: 'Comercial', value: 38 },
  { id: 3, period: 'Julho 2025', description: 'Despesas operacionais', category: 'Financeiro', value: 4820.30 },
  { id: 4, period: 'Julho 2025', description: 'Tickets resolvidos', category: 'Suporte', value: 112 },
];

export default function Content() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Relatórios</h1>

      <Card>
        <CardHeader>
          <CardTitle>Resumo Mensal</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Período</th>
                <th className="p-3">Descrição</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="p-3">{row.period}</td>
                  <td className="p-3">{row.description}</td>
                  <td className="p-3">{row.category}</td>
                  <td className="p-3">
                    {typeof row.value === 'number'
                      ? row.category === 'Financeiro'
                        ? `R$ ${row.value.toFixed(2)}`
                        : row.value
                      : row.value}
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

