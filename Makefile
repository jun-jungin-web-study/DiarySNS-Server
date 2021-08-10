up:
	docker-compose up

test:
	docker-compose -f docker-compose.yml -f docker-compose.test.yml up

down: 
	docker-compose down

clean:
	docker-compose down --volume
	docker rmi diarysns-server_ts-node-docker