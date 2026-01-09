import { z } from "zod";

export const UserStatusEnum = z.enum(["ACTIVE", "INACTIVE", "BANNED"]); 
// Ajuste conforme seu Prisma

export const UserSchema = z.object({


  lastName: z.string().nullable().optional(),
  firstName: z.string(),

  taxId: z.string().nullable().optional(),


  authEmail: z.string().email(),







  authUserId: z.string().nullable().optional(),

  docs: z.string(),
});


export default UserSchema;
export type CreateUserInput = z.infer<typeof UserSchema>;
