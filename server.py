from http.server import BaseHTTPRequestHandler, HTTPServer
import json

students = []

class Handler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == "/":
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            with open("index.html", "rb") as f:
                self.wfile.write(f.read())

        elif self.path == "/students":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(students).encode())

        elif self.path.endswith(".css"):
            self.send_response(200)
            self.send_header("Content-type", "text/css")
            self.end_headers()
            with open("style.css", "rb") as f:
                self.wfile.write(f.read())

        elif self.path.endswith(".js"):
            self.send_response(200)
            self.send_header("Content-type", "application/javascript")
            self.end_headers()
            with open("script.js", "rb") as f:
                self.wfile.write(f.read())

    def do_POST(self):
        if self.path == "/add":
            length = int(self.headers["Content-Length"])
            data = json.loads(self.rfile.read(length))
            students.append(data)
            self.send_response(200)
            self.end_headers()

    def do_PUT(self):
        if self.path.startswith("/update/"):
            index = int(self.path.split("/")[-1])
            length = int(self.headers["Content-Length"])
            students[index] = json.loads(self.rfile.read(length))
            self.send_response(200)
            self.end_headers()

    def do_DELETE(self):
        if self.path.startswith("/delete/"):
            index = int(self.path.split("/")[-1])
            students.pop(index)
            self.send_response(200)
            self.end_headers()


print("Server running at http://localhost:8000")
HTTPServer(("localhost", 8000), Handler).serve_forever()
