const baseUrl = 'https://fashion-production-c8ce.up.railway.app';
const email = `admin_${Date.now()}@test.com`;
const password = 'password123';

async function runTest() {
  console.log(`Starting test with email: ${email}`);

  // 1. Register
  console.log('\n--- 1. Register ---');
  const regRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const regData = await regRes.json();
  console.log('Register Status:', regRes.status);
  console.log('Register Response:', regData);

  // 2. Login
  console.log('\n--- 2. Login ---');
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const loginData = await loginRes.json();
  console.log('Login Status:', loginRes.status);
  const token = loginData.data?.access_token;
  if (!token) {
    console.error('Failed to get token!');
    return;
  }
  console.log('Got Token:', token.substring(0, 20) + '...');

  // 3. Test Auth Endpoint (GET /users/me)
  console.log('\n--- 3. Fetch Profile (GET /users/me) ---');
  const profileRes = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const profileData = await profileRes.json();
  console.log('Profile Status:', profileRes.status);
  console.log('Profile Response:', profileData);

  // 4. Test Category Creation (Requires Admin)
  // Note: Since this user is just registered, they are a USER by default.
  console.log('\n--- 4. Create Category (POST /categories) ---');
  const catRes = await fetch(`${baseUrl}/categories`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'Test Category', slug: 'test-category' })
  });
  const catData = await catRes.json();
  console.log('Category Status:', catRes.status);
  console.log('Category Response:', catData);
}

runTest();
