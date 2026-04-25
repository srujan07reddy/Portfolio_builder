import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string().email().max(255);

// Password validation schema (OWASP guidelines)
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letters')
  .regex(/[a-z]/, 'Password must contain lowercase letters')
  .regex(/[0-9]/, 'Password must contain numbers')
  .regex(/[!@#$%^&*]/, 'Password must contain special characters (!@#$%^&*)')
  .max(128, 'Password is too long');

// Signup schema for unified validation
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Username validation schema
export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores')
  .refine(
    (val) => !['admin', 'root', 'test', 'api', 'dashboard'].includes(val.toLowerCase()),
    'This username is reserved'
  );

// Profile update schema
export const profileSchema = z.object({
  full_name: z
    .string()
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s'-]*$/, 'Name contains invalid characters'),
  username: usernameSchema,
  bio: z
    .string()
    .max(500, 'Bio is too long'),
  template_choice: z.enum(['Researcher', 'Minimalist', 'Corporate']),
});

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  const htmlEscapeMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return input.replace(/[&<>"'\/]/g, (char) => htmlEscapeMap[char] || char);
}

// Validate and sanitize form data
export function validateAndSanitizeProfile(data: any) {
  const sanitized = {
    full_name: sanitizeInput(data.full_name || ''),
    username: data.username?.toLowerCase().trim() || '',
    bio: sanitizeInput(data.bio || ''),
    template_choice: data.template_choice || 'Researcher',
  };

  return profileSchema.parse(sanitized);
}

// Validate login credentials
export function validateLoginCredentials(email: string, password: string) {
  const result = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
  }).safeParse({ email, password });
  
  return result;
}

// Validate signup credentials
export function validateSignupCredentials(data: any) {
  return signupSchema.safeParse(data);
}