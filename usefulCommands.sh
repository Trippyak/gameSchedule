sudo docker-compose -f docker-compose.dev.yml down
sudo docker-compose -f docker-compose.dev.yml up -d --force-recreate --no-deps
sudo docker-compose -f docker-compose.dev.yml up -d --build --force-recreate --no-deps

sudo docker-compose -f docker-compose.dev.yml up --build
sudo docker-compose -f docker-compose.dev.yml up --build -d
sudo docker-compose -f docker-compose.dev.yml up -d

sudo docker ps --all -q
sudo docker images -q

sudo docker stop
sudo docker rm
sudo docker rmi


sudo docker-compose -f docker-compose.dev.yml up -d --build --force-recreate --no-deps web
