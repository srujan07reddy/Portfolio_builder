
const { validateSignupCredentials, validateLoginCredentials } = require('./src/lib/validation');

console.log('Testing Signup Validation:');
const signupTest1 = validateSignupCredentials({ email: 'invalid', password: 'short' });
console.log('Invalid email/password result:', signupTest1.success ? 'Success' : signupTest1.error.issues[0].message);

const signupTest2 = validateSignupCredentials({ email: 'test@example.com', password: 'Password123!@#' });
console.log('Valid result:', signupTest2.success ? 'Success' : signupTest2.error.issues[0].message);

console.log('\nTesting Login Validation:');
const loginTest1 = validateLoginCredentials('invalid', '');
console.log('Invalid email/empty password result:', loginTest1.success ? 'Success' : loginTest1.error.issues[0].message);
