# HTTP Fetcher  

A lightweight Node.js-based tool for making HTTP requests with ease. This project is designed to simplify fetching data from APIs or web servers, supporting GET, POST, PUT, and DELETE methods.  

## Features  

- **Ease of Use:** Simple syntax for making HTTP requests.  
- **Flexible Configuration:** Easily set headers, query parameters, and body content.  
- **Promise-Based:** Works seamlessly with async/await.  
- **Lightweight Dependency:** Minimalistic and efficient.  

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/skyneon1/http-fetcher.git  
   cd http-fetcher  
2. Install dependencies:
   ```bash
   npm install  
3. Basic Example:
   const fetcher = require('http-fetcher');  

async function getData() {  
  try {  
    const response = await fetcher.get('https://api.example.com/data');  
    console.log(response.data);  
  } catch (error) {  
    console.error('Error fetching data:', error.message);  
  }  
}  

getData();  

4. Supported Methods:
GET: fetcher.get(url, options)
POST: fetcher.post(url, data, options)
PUT: fetcher.put(url, data, options)
DELETE: fetcher.delete(url, options)

Options:
headers: Add custom headers to the request.
queryParams: Attach query parameters to the URL.
timeout: Set a timeout for the request.

Example:
const options = {  
  headers: { 'Authorization': 'Bearer token123' },  
  queryParams: { page: 1, limit: 10 },  
  timeout: 5000  
};  
fetcher.get('https://api.example.com/resource', options);  

5. Dependencies:
   axios (or the library you're using for HTTP requests)

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request with your changes.

