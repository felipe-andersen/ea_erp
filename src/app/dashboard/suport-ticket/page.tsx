'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Ticket = {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
    timeStamp: Date,
    userName: string,
    email: string
};

const tickets: Ticket[] = [
    {
        id: 'lk45fg4f',
        title: 'Erro ao acessar painel',
        timeStamp: new Date,
        userName: "Olga",
        description: 'Usuário não consegue acessar o painel administrativo desde ontem.',
        status: 'open',
        email: 'olga@gmail.com'
    },
    {
        id: 'lk45fg4f',
        title: 'Relatório com dados incorretos',
        timeStamp: new Date,
        userName: "Henrique",
        description: 'Exportação do mês de julho traz valores divergentes.',
        status: 'in_progress',
        email: 'henrique@gmail.com'
    },
    {
        id: 'lk45fg4f',
        title: 'Solicitação de troca de senha',
        timeStamp: new Date,
        userName: "Maria",
        email: "maria@gmail.com",
        description: 'Cliente esqueceu a senha e não recebeu e-mail de recuperação.',
        status: 'closed',
    }
];

export default function SupportTicketsView() {
  const filterByStatus = (status: Ticket['status']) =>
    tickets.filter((t) => t.status === status);

  return (
    <div className="max-w-4xl mx-auto px-4 ">
      <h1 className="text-2xl font-semibold">Tickets de Suporte</h1>

      <Tabs defaultValue="open" className="w-full">
        <TabsList className="flex gap-2">
          <TabsTrigger className='flex gap-1' value="open">Abertos 
            <span className='w-5 h-5 rounded-full bg-neutral-100'>1</span>
          </TabsTrigger>
          <TabsTrigger value="in_progress">Em andamento</TabsTrigger>
          <TabsTrigger value="closed">Fechados</TabsTrigger>
        </TabsList>

        <TabsContent value="open">
          <TicketList tickets={filterByStatus('open')} />
        </TabsContent>
        <TabsContent value="in_progress">
          <TicketList tickets={filterByStatus('in_progress')} />
        </TabsContent>
        <TabsContent value="closed">
          <TicketList tickets={filterByStatus('closed')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TicketList({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return <p className="text-sm text-gray-500 mt-4">Nenhum ticket encontrado.</p>;
  }

  const localDate = new Date(); // agora, no seu horário local

    // Pegar hora atual em Nova York
    const timeStamp = new Date(
        localDate.toLocaleString('en-US', { timeZone: 'America/New_York' })
    );

  return (
    <div className="space-y-4 mt-4">
      {tickets.map((ticket) => {
        const date = new Date(
            ticket.timeStamp.toLocaleString('en-US', { timeZone: 'America/New_York' })
        );
        return (
        <Card key={ticket.id}>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className='m-none '>{ticket.title}</CardTitle>
            <Badge variant="outline">{ticket.status}</Badge>
          </CardHeader>
          <CardContent className='-mt-3 leading-4'>
            <p className="text text-gray-900 mb-6">{ticket.description}</p>
            <hr className='my-3'/>
            <p className="text-0 text-gray-600 ">{ticket.userName} &middot; <span className='underline'>{ticket.email}</span> &middot; {`${date}`} </p>
          </CardContent>
        </Card>
      )})}
    </div>
  );
}
