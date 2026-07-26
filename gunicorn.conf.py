import os


bind = f"0.0.0.0:{os.environ.get('PORT', '10000')}"
worker_class = "gthread"
workers = 2
threads = 2
timeout = 90
graceful_timeout = 30
keepalive = 5
preload_app = True
max_requests = 500
max_requests_jitter = 50
accesslog = "-"
errorlog = "-"
