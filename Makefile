build:
	docker build . -t cmnts
run:
	docker run --rm -it -p 3000:3000 cmnts
