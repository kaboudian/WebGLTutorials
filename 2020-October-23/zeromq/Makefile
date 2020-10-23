all: build

build:
	npm i -s express socket.io zeromq@5

run: build
	node index.js

.PHONY: build

clean:
	rm -rf node_modules package.json package-lock.json
