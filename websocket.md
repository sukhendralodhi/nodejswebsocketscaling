Websocket = WebSocket is a communication protocol that provides a persistent, full-duplex connection between a client and a server, allowing both sides to send and receive data in real time over a single TCP connection.

# Key Features
- Persistent Connection: Once established, the connection remains open.
- Bidirectional Communication: Client and server can send messages at any time.
- Low Latency: No need to repeatedly create new HTTP requests.
- Real-Time Data Transfer: Ideal for instant updates.

## Interview Definition

WebSocket is a protocol that enables real-time, two-way communication between a client and a server through a single persistent connection. Unlike HTTP's request-response model, WebSocket allows both the client and server to exchange data independently at any time.

## Common Use Cases
1. Chat applications
2. Live notifications
3. Online gaming
4. Stock market updates
5. Collaborative editing tools
6. Live sports scores


---------------
### HTTP - Stateless Connection
### Websocket - Statefull Connection


----

## Vertical Scaling

Vertical scaling means increasing the resources (CPU, RAM, network capacity) of a single server to handle more WebSocket connections and traffic.

Example:

4 CPU Cores,
8 GB RAM,
10,000 WebSocket Connections

After upgrading:

16 CPU Cores
32 GB RAM
50,000 WebSocket Connections

Adding a more ram or spaces in currenct server called vertical scalling because we are increasing size of our server

But there is one problem we are not add more RAM and SPACE in running server we want to shutdown then we can add more RAM and SPACE

## Horizontal Scaling
Horizontal scaling means adding more servers instead of increasing the resources of a single server.

Instead of upgrading the server's CPU/RAM, you add more servers:

                Load Balancer
                      |
        --------------------------------
        |              |              |
     Server 1       Server 2       Server 3
   (3000 conn)    (3500 conn)    (3500 conn)


### Benefits

- ✅ Can handle millions of connections
- ✅ No single server bottleneck
- ✅ Better fault tolerance
- ✅ Easier to scale incrementally

## Interview Definition Horizontal scaling 

Horizontal scaling is the process of increasing application capacity by adding more servers and distributing traffic among them using a load balancer. In WebSocket applications, horizontal scaling allows the system to handle a larger number of concurrent connections while maintaining high availability and fault tolerance. Shared systems such as Redis are commonly used to synchronize messages between WebSocket servers.

### Interview Answer vertical scaling
----
If a WebSocket server already has 1000 active connections, traditional vertical scaling often requires restarting the server, which would disconnect existing clients. Some cloud environments support limited live resource upgrades, but in practice, high-scale WebSocket systems usually use horizontal scaling with load balancers so existing connections remain active while new servers handle additional traffic.

