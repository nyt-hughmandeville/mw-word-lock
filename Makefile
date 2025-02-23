# Makefile

## HELP:
.PHONY: help
## help: Show this help message.
help:
	@echo "Usage: make [target]\n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

## :
## BUILD:

.PHONY: build
## build: Build React client code.
build:
	cd client; pnpm run build

.PHONY: deploy
## deploy: Deploy Next.js code.
deploy:
	cd client; pnpm deploy

## :
## DEPENDENCIES:

.PHONY: dep-clean
## dep-clean: Remove Next.js build directory and Node modules.
dep-clean:
	@rm -rf client/build
	@rm -rf client/node_modules

.PHONY: dep-get
## dep-get: Get Node modules.
dep-get:
	cd client; pnpm install

.PHONY: dep-update
## dep-update: Update Node modules.
dep-update:
	cd client; pnpm upgrade

## :
## RUN:

.PHONY: run
## run: Run Next.js locally (on port 3000).
run:
	@echo "http://localhost:3000/"
	@cd client && pnpm dev

.PHONY: run-static
## run-static: Run static site in out dir locally (on port 3000).
run-static:
	cd client && serve -s out

## :
