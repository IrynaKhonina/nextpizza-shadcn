
import { NextResponse } from 'next/server';
// import {prisma} from "@/lib/prisma";
//
// export async function GET() {
//     // SELECT * FROM users WHERE email = 'emasd'
//     const users = await prisma.user.findMany();
//
//     return NextResponse.json(users);
// }
//
// // export async function POST(req: NextRequest) {
// //     const data = await req.json();
// //
// //     const user = await prisma.user.create({
// //         data,
// //     });
//
//     return NextResponse.json(user);
// }

export function GET(){
    return NextResponse.json({
        users:['user1', 'user2', 'user3'],
    })
}

