# RethinkDB + Web Sockets Demo

To run this demo, you will first need to get RethinkDB running locally.

The following steps will walk you through how to configure RethinkDB locally with Docker and show you how to run the demo:
1. Run: `docker pull rethinkdb`
2. Run: `docker run -d -P --name rethink1 rethinkdb`
3. Run: `docker container ls` and look for the port that is mapped to 28015. For example, if you see `0.0.0.0:49163->28015` in the output associated with rethink1, then what you are looking for is port `49163`.
4. Take the found port from the previous step and paste it [here](https://github.com/rkylerd/rethinkdb-sockets-demo/blob/master/server/db.ts#L7) to connect from the demo server.
5. Save your changes and run `npm run serve` from the root project folder.
6. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
