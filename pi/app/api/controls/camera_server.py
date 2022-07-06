'''Camera module'''
import io
import logging
import socketserver
import socket
from threading import Condition
from http import server
import picamera

IP_ADDRESS = "8.8.8.8"

PAGE = """\
<html>
<head>
<title>Automatic Pet Feeder Camera</title>
</head>
<body>
<h1>Automatic Pet Feeder Camera</h1>
<img src="stream.mjpg" width="640" height="480" />
</body>
</html>
"""


class StreamingOutput():
    '''Streaming Output'''

    def __init__(self):
        self.frame = None
        self.buffer = io.BytesIO()
        self.condition = Condition()

    def write(self, buf):
        '''Writes the output for streaming'''
        if buf.startswith(b'\xff\xd8'):
            # New frame, copy the existing buffer's content and notify all
            # clients it's available
            self.buffer.truncate()
            with self.condition:
                self.frame = self.buffer.getvalue()
                self.condition.notify_all()
            self.buffer.seek(0)
        return self.buffer.write(buf)


class StreamingHandler(server.BaseHTTPRequestHandler):
    '''Handles the stream'''

    output = StreamingOutput()

    def do_GET(self):
        '''Gets the handler'''
        if self.path == '/':
            self.send_response(301)
            self.send_header('Location', '/index.html')
            self.end_headers()
        elif self.path == '/index.html':
            content = PAGE.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path == '/stream.mjpg':
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type',
                             'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    with self.output.condition:
                        self.output.condition.wait()
                        frame = self.output.frame
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as exception:
                logging.warning('Removed streaming client %s: %s',
                                self.client_address, str(exception))
        else:
            self.send_error(404)
            self.end_headers()


class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
    '''The streaming server'''
    allow_reuse_address = True
    daemon_threads = True


class CameraStreamingService:
    '''Camera streaming service'''

    camera = picamera.PiCamera(resolution='640x480', framerate=30)
    camera_server: StreamingServer = None

    def start_streaming(self):
        '''Starts streaming'''
        output = StreamingOutput()
        self.camera.start_recording(output, format='mjpeg')
        try:
            camera_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            camera_socket.connect((IP_ADDRESS, 0))
            ip_address = camera_socket.getsockname()[0]
            host = socket.gethostname()
            print("Camera: ", ip_address, end="")
            print(":8000", "\nHost: ", host)
            address = (ip_address, 8000)
            camera_server = StreamingServer(address, StreamingHandler)
            camera_server.serve_forever()
        finally:
            self.camera.stop_recording()

    def stop_streaming(self):
        '''Shuts down the streaming server and stops recording'''
        self.camera_server.shutdown()
        self.camera.stop_recording()
