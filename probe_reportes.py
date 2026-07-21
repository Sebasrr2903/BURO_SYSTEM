import urllib.request
import sys
try:
    resp = urllib.request.urlopen('http://127.0.0.1:8000/reportes/')
    print('STATUS', resp.getcode())
    print(resp.read()[:1000])
except Exception as e:
    print('ERR', e)
    sys.exit(1)
