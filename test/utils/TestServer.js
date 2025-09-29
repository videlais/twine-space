const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

class TestServer {
    constructor(port = 8080) {
        this.port = port;
        this.server = null;
    }

    start() {
        return new Promise((resolve, reject) => {
            this.server = http.createServer((req, res) => {
                const parsedUrl = url.parse(req.url);
                let pathname = parsedUrl.pathname;
                
                console.log('HTTP request for:', pathname);
                
                // Serve vendor files from node_modules
                if (pathname.startsWith('/vendor/')) {
                    let vendorPath = '';
                    if (pathname === '/vendor/aframe.min.js') {
                        vendorPath = path.join(process.cwd(), 'node_modules/aframe/dist/aframe-master.min.js');
                    } else if (pathname === '/vendor/jquery.min.js') {
                        vendorPath = path.join(process.cwd(), 'node_modules/jquery/dist/jquery.min.js');
                    } else if (pathname === '/vendor/markdown-it.min.js') {
                        vendorPath = path.join(process.cwd(), 'node_modules/markdown-it/dist/markdown-it.min.js');
                    } else if (pathname === '/vendor/lodash.min.js') {
                        vendorPath = path.join(process.cwd(), 'node_modules/lodash/lodash.min.js');
                    }
                    
                    if (vendorPath && fs.existsSync(vendorPath)) {
                        try {
                            const data = fs.readFileSync(vendorPath);
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.end(data);
                            return;
                        } catch (error) {
                            console.log('Error serving vendor file:', error.message);
                        }
                    } else {
                        console.log('Vendor file not found:', vendorPath);
                    }
                }
                
                // Default to index.html if requesting root
                if (pathname === '/') {
                    pathname = '/index.html';
                }
                
                // Handle webpack chunk files - look in build directory for .js files with hashes
                if (pathname.match(/^\/.*\.(chunk\.js|bundle\.js|js)$/)) {
                    const filename = path.basename(pathname);
                    const buildPath = path.join(process.cwd(), 'build', filename);
                    
                    console.log('Looking for webpack chunk:', filename, 'at', buildPath);
                    
                    if (fs.existsSync(buildPath)) {
                        console.log('Found webpack chunk, serving...');
                        try {
                            const fileContent = fs.readFileSync(buildPath);
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.end(fileContent);
                            return;
                        } catch (error) {
                            console.log('Error serving webpack chunk:', error.message);
                        }
                    } else {
                        console.log('Webpack chunk not found at:', buildPath);
                        
                        // Also try in the same directory as the test file
                        const testDirPattern = pathname.match(/^(\/test\/PuppeteerTests\/[^/]+\/)(.+)$/);
                        if (testDirPattern) {
                            const testDir = testDirPattern[1];
                            const testDirBuildPath = path.join(process.cwd(), testDir.substring(1), filename);
                            console.log('Also checking test directory:', testDirBuildPath);
                            
                            if (fs.existsSync(testDirBuildPath)) {
                                console.log('Found in test directory, serving...');
                                try {
                                    const fileContent = fs.readFileSync(testDirBuildPath);
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                                    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                                    res.end(fileContent);
                                    return;
                                } catch (error) {
                                    console.log('Error serving from test directory:', error.message);
                                }
                            }
                        }
                        
                        console.log('Available files in build:', fs.existsSync(path.join(process.cwd(), 'build')) ? fs.readdirSync(path.join(process.cwd(), 'build')) : 'build directory does not exist');
                    }
                }
                
                // Construct file path for other files
                const filePath = path.join(process.cwd(), pathname.substring(1));
                
                // Check if file exists
                if (!fs.existsSync(filePath)) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Not Found');
                    return;
                }
                
                // Determine content type
                const ext = path.extname(filePath);
                let contentType = 'text/plain';
                
                switch (ext) {
                    case '.html':
                        contentType = 'text/html';
                        break;
                    case '.js':
                        contentType = 'application/javascript';
                        break;
                    case '.css':
                        contentType = 'text/css';
                        break;
                    case '.json':
                        contentType = 'application/json';
                        break;
                    case '.png':
                        contentType = 'image/png';
                        break;
                    case '.jpg':
                    case '.jpeg':
                        contentType = 'image/jpeg';
                        break;
                }
                
                // Add CORS headers for cross-origin requests
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                
                // Serve the file
                try {
                    const fileContent = fs.readFileSync(filePath);
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(fileContent);
                } catch {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
            });
            
            this.server.listen(this.port, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Test server running on http://localhost:${this.port}`);
                    resolve();
                }
            });
        });
    }
    
    stop() {
        return new Promise((resolve) => {
            if (this.server) {
                this.server.close(() => {
                    console.log('Test server stopped');
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}

module.exports = TestServer;
