import type { UserWithConfirm } from '@/common/types/user';
import type { ZodTypeAny } from 'zod';
import z from 'zod';

export const userSchemaMock = z.object<Record<keyof UserWithConfirm, ZodTypeAny>>({
  name: z.unknown().optional(),
  age: z.unknown().optional(),
  email: z.unknown().optional(),
  gender: z.unknown().optional(),
  password: z.unknown().optional(),
  country: z.unknown().optional(),
  avatar: z.unknown().optional(),
  agreement: z.unknown().optional(),
  confirm: z.unknown().optional(),
});
