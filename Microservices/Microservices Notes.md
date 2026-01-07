# What is the process of implementing Microservices

An **Architectural Style**, where an app is broken down into smaller/independent services that can be developed, deployed and scaled independently.

**Aim**: To perform a specific business function or task.

**How they Communicate with each others**: Via APIs (HTTP/REST or Message Queues).

## Deep down in Communication:

### 1. Synchronous Communication (Req-Res):

**Working:** MS1 >>> sends a request >>> MS2 and waits for a response.

**Methods:** `REST API` || `gRPC`.

**Pros**: Easy to implement and debugging.

**Cons**: Can cause latency, tight coupling.

---

### 2. Asynchronous Communication (Event-Driven):

**Working:** MS1 >>> sends a request >>> MS2 but **DOESN'T** waits for a response, and processes the message in its own time, allowing services to work independently.

**Methods:** `REST API` || `gRPC`.

**Pros**: Decouples services, Ideal for tasks that don't require immediate responses.

**Cons**: Harder to track status of requests, as there's no immediate response. Requires more complex infrastructure for managing queues or event streams.

# Next Topic to cover:
1. gRPC (Sync comm)
1. Kafka, RabbitMQ, Amazon SQS (Simple Queue Service). 