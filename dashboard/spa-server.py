#!/usr/bin/env python3
"""
Simple SPA server that serves index.html for all routes
Perfect for development of Single Page Applications
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse

class SPAHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        requested_path = parsed_path.path
        
        # Build the full file path
        if requested_path.startswith('/'):
            relative_path = requested_path[1:]  # Remove leading slash
        else:
            relative_path = requested_path
            
        # If empty path, serve index.html
        if not relative_path:
            self.path = '/index.html'
            return super().do_GET()
        
        # Build absolute file path
        file_path = os.path.join(os.getcwd(), relative_path)
        
        # Debug logging
        print(f"📂 Requested: {requested_path} -> {file_path}")
        print(f"📁 File exists: {os.path.isfile(file_path)}")
        
        # If it's a real file (CSS, JS, images, etc.), serve it normally
        if os.path.isfile(file_path):
            print(f"✅ Serving real file: {relative_path}")
            return super().do_GET()
        
        # If it's a directory with index.html, serve that
        if os.path.isdir(file_path):
            index_path = os.path.join(file_path, 'index.html')
            if os.path.isfile(index_path):
                print(f"📁 Serving directory index: {relative_path}/index.html")
                return super().do_GET()
        
        # For SPA routes (dashboard/team, etc.), serve index.html
        print(f"🔄 SPA route detected, serving index.html for: {requested_path}")
        self.path = '/index.html'
        return super().do_GET()

    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    PORT = 3001
    
    with socketserver.TCPServer(("", PORT), SPAHTTPRequestHandler) as httpd:
        print(f"🚀 SPA Server running at http://localhost:{PORT}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"🔄 All unknown routes will fallback to index.html")
        print(f"⏹️  Press Ctrl+C to stop")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n�� Server stopped") 