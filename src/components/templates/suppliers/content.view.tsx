'use client'

import { useState } from 'react'

interface Supplier {
  id: number
  name: string
  email: string
  phone: string
}

export default function Content() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: 'Distribuidora XPTO', email: 'contato@xpto.com', phone: '(11) 99999-0000' },
    { id: 2, name: 'Fornecedor Alpha', email: 'alpha@email.com', phone: '(21) 88888-1234' },
  ])

  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const handleChange = (field: keyof Supplier, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleAddSupplier = () => {
    const { name, email, phone } = form
    if (!name.trim() || !email.trim()) {
      alert('Nome e email são obrigatórios.')
      return
    }

    const newSupplier = {
      id: Date.now(),
      name,
      email,
      phone,
    }

    setSuppliers(prev => [...prev, newSupplier])
    setForm({ name: '', email: '', phone: '' })
  }

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente remover este fornecedor?')) {
      setSuppliers(prev => prev.filter(s => s.id !== id))
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Fornecedores</h1>
        <p className="text-sm text-gray-500">Gerencie os fornecedores do seu e-commerce.</p>
      </header>

      {/* Formulário */}
      <section className="border rounded p-4 space-y-4 bg-gray-50">
        <h2 className="text-lg font-semibold">Novo Fornecedor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={handleAddSupplier}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Adicionar Fornecedor
        </button>
      </section>

      {/* Lista de Fornecedores */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Lista de Fornecedores</h2>

        {suppliers.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum fornecedor cadastrado.</p>
        ) : (
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Nome</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Telefone</th>
                <th className="px-4 py-2 border text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{supplier.name}</td>
                  <td className="border px-4 py-2">{supplier.email}</td>
                  <td className="border px-4 py-2">{supplier.phone}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}
