# User service

User authentication (and credentials)

### Set the environment (optional)

```
export NODE_ENV=DEV
```

### Start the database (optional)

```
docker run --name mongo-dev -d mongo
```

### Run tests

```
npm testdev
```

### Run the api

```
npm run-script start_env
```

### Build and run the docker

```
docker build -t <container-name> .
docker run -d --name=user-service --link mongo-db1:<mongo-instance> -e NODE_ENV=<env-name> -p <port>:3000 <container-name>
```

---
The project is generated by [LoopBack](http://loopback.io).
