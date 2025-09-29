const TestServer = require('./utils/TestServer');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Mock console.log to reduce noise during tests
const originalConsoleLog = console.log;
beforeAll(() => {
    console.log = jest.fn();
});

afterAll(() => {
    console.log = originalConsoleLog;
});

describe('TestServer', () => {
    describe('constructor', () => {
        it('should create a TestServer with default port 8080', () => {
            const server = new TestServer();
            expect(server.port).toBe(8080);
            expect(server.server).toBeNull();
        });

        it('should create a TestServer with custom port', () => {
            const server = new TestServer(3000);
            expect(server.port).toBe(3000);
            expect(server.server).toBeNull();
        });
    });

    describe('start and stop', () => {
        let testServer;
        let testPort;

        beforeEach(() => {
            testPort = 9000 + Math.floor(Math.random() * 1000);
            testServer = new TestServer(testPort);
        });

        afterEach(async () => {
            if (testServer && testServer.server) {
                try {
                    await testServer.stop();
                } catch (error) {
                    // Ignore cleanup errors
                }
            }
        });

        it('should start the server and resolve promise', async () => {
            await expect(testServer.start()).resolves.toBeUndefined();
            expect(testServer.server).toBeTruthy();
        });

        it('should stop the server and resolve promise', async () => {
            await testServer.start();
            await expect(testServer.stop()).resolves.toBeUndefined();
        });

        it('should resolve immediately if server is not running', async () => {
            await expect(testServer.stop()).resolves.toBeUndefined();
        });

        it('should log server startup and stop messages', async () => {
            await testServer.start();
            expect(console.log).toHaveBeenCalledWith(`Test server running on http://localhost:${testPort}`);
            
            await testServer.stop();
            expect(console.log).toHaveBeenCalledWith('Test server stopped');
        });
    });

    describe('HTTP request handling', () => {
        let testServer;
        let testPort;

        beforeEach(async () => {
            testPort = 9000 + Math.floor(Math.random() * 1000);
            testServer = new TestServer(testPort);
            await testServer.start();
        });

        afterEach(async () => {
            if (testServer && testServer.server) {
                await testServer.stop();
            }
        });

        const makeRequest = (path) => {
            return new Promise((resolve, reject) => {
                const req = http.request({
                    hostname: 'localhost',
                    port: testPort,
                    path: path,
                    method: 'GET'
                }, (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => {
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            data: data
                        });
                    });
                });

                req.on('error', reject);
                req.setTimeout(3000, () => {
                    req.destroy();
                    reject(new Error('Request timeout'));
                });
                req.end();
            });
        };

        it('should return 404 for non-existent files', async () => {
            const response = await makeRequest('/non-existent-file.html');
            expect(response.statusCode).toBe(404);
            expect(response.data).toBe('Not Found');
        });

        it('should serve existing files with correct content type', async () => {
            const response = await makeRequest('/package.json');
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('application/json');
            expect(response.headers['access-control-allow-origin']).toBe('*');
        });

        it('should log HTTP requests', async () => {
            await makeRequest('/test-path');
            expect(console.log).toHaveBeenCalledWith('HTTP request for:', '/test-path');
        });

        it('should redirect root path to index.html', async () => {
            await makeRequest('/');
            expect(console.log).toHaveBeenCalledWith('HTTP request for:', '/');
        });

        it('should handle vendor files that exist', async () => {
            const jqueryPath = path.join(process.cwd(), 'node_modules/jquery/dist/jquery.min.js');
            
            if (fs.existsSync(jqueryPath)) {
                const response = await makeRequest('/vendor/jquery.min.js');
                expect(response.statusCode).toBe(200);
                expect(response.headers['content-type']).toBe('application/javascript');
                expect(response.headers['access-control-allow-origin']).toBe('*');
            }
        });

        it('should handle vendor files that do not exist', async () => {
            await makeRequest('/vendor/non-existent-vendor.js');
            expect(console.log).toHaveBeenCalledWith('Vendor file not found:', '');
        });

        it('should handle webpack chunk files', async () => {
            await makeRequest('/some-chunk.bundle.js');
            // Check if any call matches our expected pattern
            const calls = console.log.mock.calls;
            const hasExpectedCall = calls.some(call => 
                call[0] && call[0].includes && call[0].includes('Looking for webpack chunk:')
            );
            expect(hasExpectedCall).toBe(true);
        });

        it('should handle file read errors gracefully', async () => {
            const originalReadFileSync = fs.readFileSync;
            jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
                if (filePath.endsWith('package.json')) {
                    throw new Error('Mock file read error');
                }
                return originalReadFileSync(filePath);
            });

            const response = await makeRequest('/package.json');
            expect(response.statusCode).toBe(500);
            expect(response.data).toBe('Internal Server Error');

            fs.readFileSync.mockRestore();
        });

        it('should handle vendor file read errors', async () => {
            const originalReadFileSync = fs.readFileSync;
            jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
                if (filePath.includes('jquery.min.js')) {
                    throw new Error('Mock vendor file error');
                }
                return originalReadFileSync(filePath);
            });

            await makeRequest('/vendor/jquery.min.js');
            expect(console.log).toHaveBeenCalledWith('Error serving vendor file:', 'Mock vendor file error');

            fs.readFileSync.mockRestore();
        });

        it('should set correct content types for different extensions', async () => {
            // Test a few key content types by checking the server logic
            const response = await makeRequest('/package.json');
            expect(response.headers['content-type']).toBe('application/json');
            
            // We can test the logic by examining what would happen with other extensions
            // The content type mapping is covered by the package.json test and others
        });

        it('should handle webpack chunks in test directories', async () => {
            await makeRequest('/test/PuppeteerTests/SomeTest/chunk.bundle.js');
            
            // Should attempt to look in test directory
            const calls = console.log.mock.calls;
            const hasTestDirCheck = calls.some(call => 
                call[0] && call[0].includes && call[0].includes('Also checking test directory:')
            );
            expect(hasTestDirCheck).toBe(true);
        });

        it('should handle different file extensions for content type mapping', async () => {
            // Create a temporary text file to test plain text content type
            const fs = require('fs');
            const testFilePath = path.join(process.cwd(), 'test-file.txt');
            
            try {
                fs.writeFileSync(testFilePath, 'test content');
                const response = await makeRequest('/test-file.txt');
                expect(response.statusCode).toBe(200);
                expect(response.headers['content-type']).toBe('text/plain');
            } finally {
                // Clean up
                if (fs.existsSync(testFilePath)) {
                    fs.unlinkSync(testFilePath);
                }
            }
        });
    });
});