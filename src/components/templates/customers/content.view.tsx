'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

type Client = {
    id: string;
    name: string;
    email: string;
    phone: string;
};

const mockClients: Client[] = [
    { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-1234' },
    { id: '2', name: 'Maria Oliveira', email: 'maria@email.com', phone: '(21) 98888-5678' },
    { id: '3', name: 'Carlos Souza', email: 'carlos@email.com', phone: '(31) 97777-4321' },
];

export default function Content() {
    const [clients, setClients] = useState<Client[]>(mockClients);

    return (
        <div className="p-6 space-y-6 h-full w-full overflow-y-scroll">
            <div className="flex justify-between items-center h-auto">
                <h1 className="text-2xl font-semibold">Clientes</h1>
                <Button>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Novo Cliente
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telefone</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{client.phone}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
