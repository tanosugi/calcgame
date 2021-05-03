#!/bin/bash
set +x
echo ---------------------------
echo frontend
echo http://calcgame.s3-website-ap-northeast-1.amazonaws.com/
echo ---------------------------
set -x
cd client
npm run build
aws --region ap-northeast-1 s3 sync build s3://calcgame --delete
cd ..

set +x
echo ---------------------------
echo backend
echo http://18.183.158.39:8000/
echo ---------------------------
set -x
ssh -i ~/.ssh/calcgame-key.pem ec2-user@18.183.158.39 "cd calcgame; git pull"
ssh -i ~/.ssh/calcgame-key.pem ec2-user@18.183.158.39 "cd calcgame; docker-compose down"
ssh -i ~/.ssh/calcgame-key.pem ec2-user@18.183.158.39 "cd calcgame; docker-compose build"
ssh -i ~/.ssh/calcgame-key.pem ec2-user@18.183.158.39 "cd calcgame; docker-compose up -d"
ssh -i ~/.ssh/calcgame-key.pem ec2-user@18.183.158.39 "cd calcgame/server; poetry run ./manage.py makemigrations"
ssh -i ~/.ssh/calcgame-key.pem ec2-user@18.183.158.39 "cd calcgame/server; poetry run ./manage.py migrate"
ssh -i ~/.ssh/calcgame-key.pem ec2-user@18.183.158.39 "sudo lsof -t -i tcp:8000 | xargs kill -9"
ssh -i ~/.ssh/calcgame-key.pem ec2-user@18.183.158.39 "cd calcgame/server; nohup poetry run ./manage.py runserver 0.0.0.0:8000 --noreload &"

