# User service

User authentication (and credentials)

### Set the environment

```
export NODEENV=dev
```

### Start the database (optional)

```
docker run --name mongo-dev -d mongo
```

### Run the api

```
npm run-script start_env
```

### Build and run the docker

```
docker build -t <container-name> .
docker run -d --name=user-api -e NODEENV=<nom-de-l-env> -p 10000:3000 <container-name>
```

---
The project is generated by [LoopBack](http://loopback.io).
