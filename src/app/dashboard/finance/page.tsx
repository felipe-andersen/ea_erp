'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Finance from '@/components/templates/finance/finance.view';

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

export default function FinancePage() {
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <Finance />
    )
}
