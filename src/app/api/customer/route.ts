import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import * as customerSchema from "@/shared/schemas/customer";
import { NextResponse } from 'next/server';
import logger from '@/lib/pino';
import firebaseApp from '@/lib/firebase/firebase';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';


const nosqldb = getFirestore(firebaseApp);

// const prisma = new PrismaClient();

type IBody = {
    name: string
}

// export async function POST(req: Request) {

//     function isRequestBodyValid(obj: any): obj is { name: string } {
//         return (
//             typeof obj === 'object' &&
//             obj !== null &&
//             typeof obj.name === 'string'
//         )
//     }

//     if (req.method !== 'POST') {
//         // res.setHeader('Allow', ['POST']);
//         // res.status(405).end(`Method ${req.method} Not Allowed`);
//     } else {
//         const body = await req.json();

//         if(!isRequestBodyValid(body)) {
//             return new Response('Invalid request body', { status: 400 });
//         } 

//         const data: IBody = body;
        
//         const { name } = data;

//         if (!name) {
//             return new Response('Invalid or non-existent name', {
//             })
//         }
        
//         if(customerSchema.name.safeParse(name).success! === false) { 
//             return new Response('Invalid data', {})
//         } 

//         const newCustomer = {
//             name: name
//         }

//         try {
//             const customer = await prisma.customer.create({
//                 data: newCustomer
//             })
//             return new NextResponse(
//                 "Customer created", {status: 201}
//             )
//         } catch (error: any) {
//             return new NextResponse(
//                 "Could not create customer", {status: 500}
//             )
//             logger.error(error)
//         }
//     }
// }

type ICustomer = {
    email: String
    cpf: string
    cnpj: string
}



export async function POST(req: Request) {
    try {
        const body = await req.json();

        const docRef = await addDoc(collection(nosqldb, "clients"), body);
        console.log("Documento criado com ID:", docRef.id);

        return NextResponse.json({ id: docRef.id }, { status: 200 });
    } catch (e) {
        console.error("Erro ao adicionar documento:", e);
        return NextResponse.json({ error: "Erro ao adicionar documento." }, { status: 400 });
    }
}







export async function GET() {
  try {
    const snapshot = await getDocs(collection(nosqldb, "clients"));
    const clients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(clients);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 });
  }
}

