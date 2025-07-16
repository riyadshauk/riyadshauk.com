import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check if admin already exists
    const existingAdmin = await db.query.users.findFirst({
      where: eq(users.email, "riyad.shauk@gmail.com"),
    });

    if (existingAdmin) {
      // Update the user to be an admin if they're not already
      if (existingAdmin.role !== 'admin') {
        const updatedAdmin = await db.update(users)
          .set({ 
            role: 'admin', 
            isVerified: true,
            updatedAt: new Date()
          })
          .where(eq(users.id, existingAdmin.id))
          .returning();
        
        const { passwordHash, ...adminWithoutPassword } = updatedAdmin[0];
        return NextResponse.json(
          { message: "Admin user updated successfully", user: adminWithoutPassword },
          { status: 200 }
        );
      }
      
      const { passwordHash, ...adminWithoutPassword } = existingAdmin;
      return NextResponse.json(
        { message: "Admin user already exists", user: adminWithoutPassword },
        { status: 200 }
      );
    }

    // Create admin user
    const hashedPassword = await hashPassword("admin123"); // You should change this password
    
    const adminUser = await db.insert(users).values({
      email: "riyad.shauk@gmail.com",
      name: "Riyad Shauk",
      passwordHash: hashedPassword,
      role: "admin",
      isVerified: true,
    }).returning();

    const { passwordHash, ...adminWithoutPassword } = adminUser[0];

    return NextResponse.json(
      { 
        message: "Admin user created successfully", 
        user: adminWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 