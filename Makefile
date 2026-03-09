SHELL := /bin/sh

.PHONY: help install test test-unit build webpack serve clean

help:
	@echo "Available targets:"
	@echo "  make install    - install npm dependencies"
	@echo "  make test       - run all tests (same as npm test)"
	@echo "  make test-unit  - run TypeScript test suites only"
	@echo "  make build      - run project build script"
	@echo "  make webpack    - compile frontend bundle once"
	@echo "  make serve      - start local server"
	@echo "  make clean      - remove generated bundle"

install:
	npm install

test:
	npm test -- --runInBand

test-unit:
	npx jest tests/*.test.ts --runInBand

build:
	npm run build

webpack:
	npx webpack

serve:
	npm run serve

clean:
	rm -f public/script.js
