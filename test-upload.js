const fs = require('fs');
const FormData = require('form-data');

fs.writeFileSync('dummy.jpg', 'dummy content');

const form = new FormData();
form.append('name', 'Test');
form.append('price', '10');
form.append('categoryId', '1');
form.append('image', fs.createReadStream('dummy.jpg'));

fetch('http://127.0.0.1:3000/products', {
  method: 'POST',
  body: form
}).then(r => r.json()).then(console.log).catch(console.error);
