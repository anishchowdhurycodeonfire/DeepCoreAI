const fs = require('node:fs');
const path = require('node:path');

// Step 1: Read the index.html file
const content = fs.readFileSync('index.html', 'utf8');

// Step 2: Use a regular expression to find all links in the file
const links = [...content.matchAll(/href="([^"]+)"|src="([^"]+)"/g)].map(match => match[1] || match[2]);

// Base URL
const baseUrl = "https://www.c-asm.com/";

(async () => { 
    // Step 3: For each link, construct the full URL and download the content 
    for (const link of links) {
        const fullUrl = baseUrl + link;
        try {
            const response = await fetch(fullUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const arrayBuffer = await response.arrayBuffer();
            const data = Buffer.from(arrayBuffer);

            // Step 4: Create the necessary folder structure
            const dir = path.dirname(link);
            fs.mkdirSync(dir, { recursive: true });

            // Step 5: Save the downloaded content to the appropriate location
            fs.writeFileSync(link, data);
            console.log(`Downloaded: ${fullUrl}`);
        } catch (error) {
            console.error(`Failed to download ${fullUrl}: ${error.message}`);
        }
    }
})();

console.log("Download complete.");