#!/usr/bin/env python3
import http.server
import socketserver
import os

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.lstrip('/')
        
        # Static files (CSS, JS, images, etc.)
        if any(path.endswith(ext) for ext in ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot']):
            return super().do_GET()
        
        # API calls or specific files
        if path.startswith('api/') or os.path.isfile(path):
            return super().do_GET()
        
        # SPA routes - serve index.html
        self.path = '/index.html'
        return super().do_GET()

PORT = 4000
with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
    print(f"🚀 Simple SPA Server: http://localhost:{PORT}")
    httpd.serve_forever() 