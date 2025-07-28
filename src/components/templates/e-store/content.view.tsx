

'use client'

import { useState } from "react"

interface Category {
  id: number
  name: string
}

interface ActionPlanItem {
  id: number
  title: string
  done: boolean
}

export default function Content() {
  // Métricas simuladas
  const metrics = {
    totalSales: 1234,
    revenue: 56789.45,
    totalProducts: 78,
  }

  // Categorias
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Roupas" },
    { id: 2, name: "Calçados" },
    { id: 3, name: "Eletrônicos" },
  ])

  // Novo nome para categoria
  const [newCategory, setNewCategory] = useState("")

  // Plano de Ação
  const [actionPlans, setActionPlans] = useState<ActionPlanItem[]>([
    { id: 1, title: "Melhorar SEO das páginas", done: false },
    { id: 2, title: "Lançar campanha de desconto", done: true },
  ])

  const [newAction, setNewAction] = useState("")

  // Funções categorias
  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (!trimmed) return alert("Digite o nome da categoria")

    if (categories.find(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
      return alert("Categoria já existe")
    }

    setCategories([...categories, { id: Date.now(), name: trimmed }])
    setNewCategory("")
  }

  const handleDeleteCategory = (id: number) => {
    if (confirm("Deseja deletar esta categoria?")) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  // Funções plano de ação
  const handleAddAction = () => {
    const trimmed = newAction.trim()
    if (!trimmed) return alert("Digite o título da ação")

    setActionPlans([...actionPlans, { id: Date.now(), title: trimmed, done: false }])
    setNewAction("")
  }

  const toggleActionDone = (id: number) => {
    setActionPlans(actionPlans.map(a => a.id === id ? { ...a, done: !a.done } : a))
  }

  const handleDeleteAction = (id: number) => {
    if (confirm("Deseja deletar esta ação?")) {
      setActionPlans(actionPlans.filter(a => a.id !== id))
    }
  }

  return (
    <main className=" p-10 h-full overflow-y-scroll w-full">
      {/* Métricas */}
      <section className="grid grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-blue-100 rounded">
          <h2 className="text-3xl font-bold">{metrics.totalSales}</h2>
          <p className="text-blue-800 font-semibold">Total de Vendas</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h2 className="text-3xl font-bold">R$ {metrics.revenue.toFixed(2)}</h2>
          <p className="text-green-800 font-semibold">Receita</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          <h2 className="text-3xl font-bold">{metrics.totalProducts}</h2>
          <p className="text-yellow-800 font-semibold">Produtos</p>
        </div>
      </section>

      {/* Categorias */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Categorias</h2>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Nova categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </div>

        {categories.length === 0 && (
          <p className="text-center text-gray-500">Nenhuma categoria cadastrada.</p>
        )}

        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex justify-between items-center border border-gray-300 rounded px-4 py-2"
            >
              <span>{cat.name}</span>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-red-600 hover:text-red-800"
                aria-label={`Deletar categoria ${cat.name}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Plano de Ação */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Plano de Ação</h2>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Nova ação"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleAddAction}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Adicionar
          </button>
        </div>

        {actionPlans.length === 0 && (
          <p className="text-center text-gray-500">Nenhuma ação cadastrada.</p>
        )}

        <ul className="space-y-2">
          {actionPlans.map((action) => (
            <li
              key={action.id}
              className="flex items-center justify-between border border-gray-300 rounded px-4 py-2"
            >
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={action.done}
                  onChange={() => toggleActionDone(action.id)}
                  className="cursor-pointer"
                />
                <span className={action.done ? "line-through text-gray-500" : ""}>
                  {action.title}
                </span>
              </label>
              <button
                onClick={() => handleDeleteAction(action.id)}
                className="text-red-600 hover:text-red-800"
                aria-label={`Deletar ação ${action.title}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
