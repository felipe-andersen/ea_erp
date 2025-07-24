'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Task = {
  id: number;
  title: string;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
  responsible: string;
  scheduledDate: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: 'Entrega de materiais',
    status: 'Pendente',
    responsible: 'Carlos Silva',
    scheduledDate: '2025-07-24',
  },
  {
    id: 2,
    title: 'Manutenção do sistema',
    status: 'Em andamento',
    responsible: 'Fernanda Lima',
    scheduledDate: '2025-07-23',
  },
  {
    id: 3,
    title: 'Reunião com fornecedor',
    status: 'Concluído',
    responsible: 'João Mendes',
    scheduledDate: '2025-07-22',
  },
];

export const Content = function () {
  return (
    <div className="w-full mx-auto p-10 bg-neutral-100 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Painel Operacional</h1>
        <Button variant="default">Nova tarefa</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Atividades em andamento</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-0 text-left">
              <tr>
                <th className="p-3">Tarefa</th>
                <th className="p-3">Responsável</th>
                <th className="p-3">Data</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.responsible}</td>
                  <td className="p-3">{task.scheduledDate}</td>
                  <td className="p-3">
                    <Badge
                      className={
                        task.status === 'Concluído'
                          ? 'bg-green-500'
                          : task.status === 'Em andamento'
                          ? 'bg-yellow-400 text-black'
                          : 'bg-red-400'
                      }
                    >
                      {task.status}
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

export default Content