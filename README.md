# rmg-backend


npm init 
npm install  express --save 

npm install mysql

npm install body-parser


mysqldump -u root -p rmg_1 > rmg_1-$(date +%F).sql


import to db
mysql -u root -p rmg_1 < full-backup.sql




import a single table
mysql -u dbadmin -p db1 < db1-table1.sql



data list and entry: {local testing}
curl -X POST --data '{"user_id":"varun ravula","phone":"8080808080","state":"Andhra Pradesh","email_id":"varun@gmail.com","f_name":"varun","l_name":"ravula"}' -H "Content-Type: application/json"  http://localhost:80/add_user

curl -X GET http://localhost:80/list_user



{remote testing}
curl -X POST --data '{"user_id":"varun ravula","phone":"8080808080","state":"Andhra Pradesh","email_id":"varun@gmail.com","f_name":"varun","l_name":"ravula"}' -H "Content-Type: application/json"  http://54.169.191.238/add_user

curl -X GET http://54.169.191.238/list_user





linux instance
public ip: 54.169.191.238
chmod 400 rmg-key-pair.pem
ec2-user@ec2-54-169-191-238.ap-southeast-1.compute.amazonaws.com
ssh -i "rmg-key-pair.pem" ec2-user@ec2-54-169-191-238.ap-southeast-1.compute.amazonaws.com


install node js:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"

sudo yum install mysql-server



scp -i myAmazonKey.pem phpMyAdmin-3.4.5-all-languages.tar.gz ec2-user@mec2-50-17-16-67.compute-1.amazonaws.com:~/.


mysql
ssh -i "rmg-key-pair.pem" ec2-user@ec2-13-229-79-210.ap-southeast-1.compute.amazonaws.com


link local repo to remote:
git remote add origin <remote_repo_url>
git push --all origin




whereis node
node: /home/<my_user>/.nvm/versions/node/v8.9.4/bin/node
sudo ln -s /home/<my_user>/.nvm/versions/node/v8.9.4/bin/node /usr/bin/node

