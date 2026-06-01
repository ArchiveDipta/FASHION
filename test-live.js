const baseUrl = 'https://fashion-production-c8ce.up.railway.app';

async function runTests() {
  console.log('--- Starting API Testing against Live Environment ---');
  console.log(`Base URL: ${baseUrl}\n`);

  try {
    // 1. Health check / Root check
    console.log('1. Checking root endpoint...');
    const rootRes = await fetch(`${baseUrl}/`);
    console.log(`Root endpoint status: ${rootRes.status}`);
    const rootText = await rootRes.text();
    console.log(`Response: ${rootText.slice(0, 100)}\n`);
  } catch (error) {
    console.error('Error during root check:', error);
  }

  try {
    // 2. Fetch Swagger docs JSON
    console.log('2. Fetching Swagger spec...');
    const docsRes = await fetch(`${baseUrl}/docs-json`);
    console.log(`Swagger docs status: ${docsRes.status}`);
    if (docsRes.ok) {
      const docsJson = await docsRes.json();
      const paths = Object.keys(docsJson.paths || {});
      console.log('Endpoints found in Swagger:', paths);
    } else {
      console.log('Failed to fetch Swagger JSON');
    }
  } catch (error) {
    console.error('Error during Swagger check:', error);
  }
}

runTests();
