# begin

### Mysql if needed
```bash
docker run --name begin -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=begin -d mysql
ALTER USER root IDENTIFIED WITH mysql_native_password BY 'password';
```

### Database
Default is sqlite. Orm generate tables. 

### Api
```bash
$ cd api
$ npm install
$ npm run start:dev
```
http://localhost:5000

- Time spent ~ 5h
