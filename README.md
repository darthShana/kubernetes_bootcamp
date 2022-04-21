# kubernetes_bootcamp

## Before you start

First thing you will need for this workshop is a running rest api on a headless platform. like node, java, dotnetcore, go, python etc..

For this example ill be using a node rest api, but you can use whatever you like as mentioned above.

### Install what you need to run node. or whatever microservice you decide
* install node
* install npm
* check by running
```
node --version
npm --version
```

### Install docker
(https://docs.docker.com/engine/install/)
* check by running 
```
docker ps
```

### Create an account on DockerHUB
There are a lot of different docker containers you could use in this tutorial ill be using a free and public dockerHub 
account. You can create one at (https://hub.docker.com/). Check that you can do 
```
docker login
```

### Install kubectl
(https://kubernetes.io/docs/tasks/tools/)
* check by running
```
kubectl version
```

## Build and run your app
### Build and run
If you're running the app ive built, then you just need to build it
```
npm install
node index.js
```
opening a browser and going to http://localhost:3333/books should show
![docker hub](./images/local_app.png?raw=true)
### Build your docker image
```
docker build . -t [DOCKERHUB_USERNAME]/node-simple-app:dev
```
### Test your image
```
docker run -p 8080:3333 [DOCKERHUB_USERNAME]/node-simple-app:dev
```
Now going to http://localhost:8080/books should give you the same result as the figure above
### Push your image to the world
```
docker push [DOCKERHUB_USERNAME]/node-simple-app:dev
```
now check that your image is available for the whole world to use. But only you can push to it.
![docker hub](./images/docker_hub.png?raw=true)


## Lets talk about Kubernetes

* Pods
* Nodes
* Deployments
* Services

![kubernetes](https://camo.githubusercontent.com/f403ac1da005b696ade87674553edd767314b185676b0a8500f59b99c669684d/68747470733a2f2f7777772e6775727539392e636f6d2f696d616765732f312f3036313431395f303433305f4b756265726e6574657354312e706e67)

### Connect through kubectl

copy deployment/config-turners-chirs to your HOME_DIR/.kube/config
then do
```
kubectl --kubeconfig ~/.kube/config-turners-chris get nodes
kubectl --kubeconfig ~/.kube/config-turners-chris get pods
```

### create your deployment
Let's have a look at deployment/deployment.yaml adjust it to work with your app name and your image. Then apply your file
```
kubectl --kubeconfig ~/.kube/config-turners-chris apply -f deployment/deployment.yaml
```
Now check that your pods are running (control plane API)
```
kubectl --kubeconfig ~/.kube/config-turners-chris port-forward [POD_NAME] 8080:3333
```
1. Try increasing the replica count. (Idempotency)
2. Change the app to output something else And notice the blue-green deployment.

### Let's create a service
Let's have a look at deployment/service.yaml adjust it to work with your deployment created above. Then apply your service
```
kubectl --kubeconfig ~/.kube/config-turners-chris apply -f deployment/service.yaml
```
1. Talk about kube DNS
2. Talk about LoadBalancer / NodePort

go to http://orb-dev-ws6.auctions.co.nz:[your port]/books. And see your App running in the world
