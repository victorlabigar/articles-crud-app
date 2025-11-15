import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {

        // start validation
        // lets get the email and password from the body by destructering it
        const body = await request.json();
        const { name, email, password } = body;

        if(!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400}
            )
        }

        // lets check for user existence
        const existingUser = await prisma.user.findUnique({
            where: {email: email}
        });

        if(existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exist'},
                { status: 400}
            )
        }
        // end of validation


        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                name: name
            }
        });

        console.log('user', user);

        return NextResponse.json(
            { id: user.id, email: user.email, name: user.name },
            { status: 201 }
        )
        
    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}