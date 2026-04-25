
const { z } = require('zod');

const emailSchema = z.string().email().max(255);
const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letters')
  .regex(/[a-z]/, 'Password must contain lowercase letters')
  .regex(/[0-9]/, 'Password must contain numbers')
  .regex(/[!@#$%^&*]/, 'Password must contain special characters (!@#$%^&*)')
  .max(128, 'Password is too long');

try {
  console.log('Testing test@example.com');
  emailSchema.parse('test@example.com');
  console.log('Valid');
} catch (e) {
  console.log('Invalid:', e.message);
}

try {
  console.log('Testing invalid-email');
  emailSchema.parse('invalid-email');
} catch (e) {
  console.log('Invalid:', e.message);
}
