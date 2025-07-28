'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Partner = {
  id: number;
  name: string;
  type: 'Fornecedor' | 'Afiliado' | 'Integrador';
  contact: string;
  status: 'ativo' | 'inativo';
};

const partners: Partner[] = [
  { id: 1, name: 'Tech Distribuidora', type: 'Fornecedor', contact: 'suporte@tech.com', status: 'ativo' },
  { id: 2, name: 'Canal Vendas BR', type: 'Afiliado', contact: 'contato@canalbr.com', status: 'ativo' },
  { id: 3, name: 'APIConnect', type: 'Integrador', contact: 'dev@apiconnect.io', status: 'inativo' },
];

export default function PartnershipsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Parcerias</h1>

      <Card>
        <CardHeader>
          <CardTitle>Empresas Parceiras</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Nome</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">CNPJ</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.type}</td>
                  <td className="p-3">{p.contact}</td>
                  <td className="p-3">
                    <Badge
                      className={
                        p.status === 'ativo'
                          ? 'bg-green-500'
                          : 'bg-gray-400 text-gray-800'
                      }
                    >
                      {p.status === 'ativo' ? 'Ativo' : 'Inativo'}
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
