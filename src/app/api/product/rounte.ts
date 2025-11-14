import { NextRequest, NextResponse } from 'next/server'

type ProductCategory = {
    id: string
    name: string
    description?: string
    status?: string
}

type Product = {
    id: string
    name: string
    description?: string
    price: number
    categoryId: string
    status?: string
}

const categories: ProductCategory[] = []
const products: Product[] = []

function generateId() {
    return Math.random().toString(36).substring(2, 10)
}

// --- Product Category CRUD ---

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')

    if (type === 'category') {
        if (id) {
            const category = categories.find(c => c.id === id && c.status !== 'deleted')
            return NextResponse.json(category)
        }
        return NextResponse.json(categories.filter(c => c.status !== 'deleted'))
    }

    if (type === 'product') {
        if (id) {
            const product = products.find(p => p.id === id && p.status !== 'deleted')
            return NextResponse.json(product)
        }
        return NextResponse.json(
            products
                .filter(p => p.status !== 'deleted')
                .map(p => ({
                    ...p,
                    category: categories.find(c => c.id === p.categoryId)
                }))
        )
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { type } = body

    if (type === 'category') {
        const { name, description } = body
        const category: ProductCategory = {
            id: generateId(),
            name,
            description,
            status: 'active'
        }
        categories.push(category)
        return NextResponse.json(category)
    }

    if (type === 'product') {
        const { name, description, price, categoryId } = body
        const product: Product = {
            id: generateId(),
            name,
            description,
            price,
            categoryId,
            status: 'active'
        }
        products.push(product)
        return NextResponse.json(product)
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}

export async function PUT(req: NextRequest) {
    const body = await req.json()
    const { type, id } = body

    if (type === 'category') {
        const { name, description } = body
        const category = categories.find(c => c.id === id && c.status !== 'deleted')
        if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        category.name = name
        category.description = description
        return NextResponse.json(category)
    }

    if (type === 'product') {
        const { name, description, price, categoryId } = body
        const product = products.find(p => p.id === id && p.status !== 'deleted')
        if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        product.name = name
        product.description = description
        product.price = price
        product.categoryId = categoryId
        return NextResponse.json(product)
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    if (type === 'category') {
        const category = categories.find(c => c.id === id)
        if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        category.status = 'deleted'
        return NextResponse.json({ success: true })
    }

    if (type === 'product') {
        const product = products.find(p => p.id === id)
        if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        product.status = 'deleted'
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}