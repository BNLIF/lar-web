# LAr Website at BNL

This is the LAr website at [http://lar.bnl.gov/](http://lar.bnl.gov/).

To run locally:
```bash
git clone https://github.com/BNLIF/lar-web.git
cd lar-web
python -m SimpleHTTPServer
```

Or, with [livereload](https://github.com/lepture/python-livereload)
```python
from livereload import Server
server = Server()
server.watch('index.html')
server.serve(root='.')
```

Instructions for writing can be found [here](https://github.com/BNLIF/lar-web/tree/master/properties).

