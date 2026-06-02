fetch('https://fashion-production-c8ce.up.railway.app/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Test', price: 10, categoryId: 9999 })
}).then(r => r.json()).then(console.log);
