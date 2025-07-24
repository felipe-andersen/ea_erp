
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Campaign = {
  id: number;
  name: string;
  channel: 'Email' | 'Google Ads' | 'Instagram' | 'WhatsApp';
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'finished';
  leads: number;
};

const campaigns: Campaign[] = [
  {
    id: 1,
    name: 'Promoção de Inverno',
    channel: 'Email',
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    status: 'finished',
    leads: 120,
  },
  {
    id: 2,
    name: 'Anúncio Google Julho',
    channel: 'Google Ads',
    startDate: '2025-07-10',
    endDate: '2025-07-25',
    status: 'active',
    leads: 87,
  },
  {
    id: 3,
    name: 'Lançamento Produto B',
    channel: 'Instagram',
    startDate: '2025-07-20',
    endDate: '2025-08-10',
    status: 'paused',
    leads: 42,
  },
];

export default function Content () {
  return (
    <div className="w-full p-10">
      <h1 className="text-2xl font-semibold">Campanhas de Marketing</h1>

      <Card>
        <CardHeader>
          <CardTitle>Campanhas Ativas e Finalizadas</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Nome</th>
                <th className="p-3">Canais</th>
                <th className="p-3">Início</th>
                <th className="p-3">Término</th>
                <th className="p-3">Status</th>
                <th className="p-3">Orçamento</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.channel}</td>
                  <td className="p-3">{c.startDate}</td>
                  <td className="p-3">{c.endDate}</td>
                  <td className="p-3">
                    <Badge
                      className={`${
                        c.status === 'active'
                          ? 'bg-green-200 text-black'
                          : c.status === 'paused'
                          ? 'bg-yellow-200 text-black'
                          : 'bg-gray-200 text-black'
                      }`}
                    >
                      {c.status === 'active'
                        ? 'Ativa'
                        : c.status === 'paused'
                        ? 'Pausada'
                        : 'Finalizada'}
                    </Badge>
                  </td>
                  <td className="p-3">{c.leads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
