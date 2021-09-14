build_dev:
	@docker-compose build project_rest_api_dev

run_logs_api_dev:
	@docker-compose up -d project_rest_api_dev
	@docker-compose logs -f project_rest_api_dev

build_run_logs_api_dev:
	@docker-compose up -d --build project_rest_api_dev
	@docker-compose logs -f project_rest_api_dev

stop:
	@docker-compose down

restart_dev: stop run_logs_api_dev

# database
init_db_dev:
	@docker-compose exec project_rest_api_dev yarn db:init

drop_db_dev:
	@docker-compose exec project_rest_api_dev yarn db:drop

refresh_db_dev:
	@docker-compose exec project_rest_api_dev yarn db:refresh

# test
test:
	@docker-compose exec project_rest_api_dev yarn test

test_watch:
	@docker-compose exec project_rest_api_dev yarn test:watch