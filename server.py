import tornado.ioloop
import tornado.web
import signal
import sys

class PrintHandler(tornado.web.RequestHandler):
    def post(self):
        r = float(self.get_argument("screen_resolution"))
        if self.get_argument("orientation") == "landscape":
            width =  1122
            height =  793
        else:
                width =  794
                height =  1122
        data = {
                "x": self.get_argument("x"),
                "y": self.get_argument("y"), 
                "zoom": self.get_argument("zoom"),
                "width": width,
                "height": height
               }
        self.render("static/print.html", data=data)

def make_app():
    return tornado.web.Application([
        (r"/()$", tornado.web.StaticFileHandler, {"path":"static/index.html"}),
        (r"/print", PrintHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {"path":"static/"})
    ])

def on_shutdown():
    print("Server stopped")
    tornado.ioloop.IOLoop.instance().stop()

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    loop = tornado.ioloop.IOLoop.current()
    signal.signal(signal.SIGINT, lambda signal, frame: loop.add_callback_from_signal(on_shutdown))
    print("Server is running on http://localhost:8888")
    loop.start()
