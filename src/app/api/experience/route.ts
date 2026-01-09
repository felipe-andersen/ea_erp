// import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma/prisma-client";


export type ExperienceApiResponse = {
    success: boolean
    message: string
    data: TExperience[]
}

export type TExperience = {
  id: string
  slug: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  publicatedAt: string
  companyId: string
  experienceAddressId: string | null
}

/**
 * 
 * Pegar todas as experiencias a partir de uma data.
 * Pegar uma experiencia a partir de um experienceId
 */

/**
 * @param {NextRequest} req - User request
*/

export async function GET(req: NextRequest)/*: Promise<ApiResponse>*/ {
    // const { experienceIds } = req.url.split('/').pop()!.split('?')[0].

    let list: Array<Object>

    // const body = req.json()

    // if(!body) {
    //     console.log({
    //         success: false,
    //         message: '',
    //         data: null
    //     })
    //     NextResponse.json({
    //         success: false,
    //         message: '',
    //         data: null
    //     })
    // }
    
    try {
        const experienceList = await prisma.experience.findMany();

        if(!experienceList) {
            console.log(`Sem experiencias`)
            return NextResponse.json({
                success: false,
                message: 'Não foi possível trazer experiências',
                data: null
            })
        } 
        return NextResponse.json(experienceList, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            }
        });

    } catch (err: any) {
        console.error("Erro Prisma:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function POST(req: NextRequest)/*: Promise<ApiResponse>*/ {

    const body = req.json()

    if(!body) {
        console.log({
            success: false,
            message: '',
            data: null
        })
        NextResponse.json({
            success: false,
            message: '',
            data: null
        })
    }
    
    // const experience = await prisma.experience.create({
    //     data: {
    //         title: body.title,
    //         description: body.description,
    //         company: body.company,
    //         startDate: body.startDate,
    //         endDate: body.endDate,
            
    //     }
    // })

    return NextResponse.json({
        success: 'string',
        message: 'string',
        data: 'any'
    })
}

