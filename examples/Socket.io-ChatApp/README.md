## Socket.io
<p align="center">
    <img src="https://miro.medium.com/max/1622/1*tOitxCwTNcS3ESstLylmtg.png" alt="Socket io"  height = "350">
</p>

> Writing a chat application with popular web applications stacks like LAMP (PHP) has traditionally been very hard. It involves polling the server for changes, keeping track of timestamps, and it’s a lot slower than it should be. 
> Sockets have traditionally been the solution around which most real-time chat systems are architected, providing a bi-directional communication channel between a client and a server.
This means that the server can push messages to clients. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients.



### Installation and Running

 Install the dependencies:
```sh
$ npm install 
```
Run the application:
```sh
$ npm run server
```
Unit tests: 
```sh
$ npm run test
```
### Deployment 
Verify the deployment by navigating to your server **PORT NUMBER** in your preferred browser.
Running through Localhost.
```sh
http://localhost:PORT_NUMBER
```
Running through server address
```sh
http://127.0.0.1:PORT_NUMBER
```

#### Web references

https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088



