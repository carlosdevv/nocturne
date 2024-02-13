# Nocturne API

Nocturne is a microservice API focused on the management of notifications. Created using NestJS.
<br /><br />

## # Purpose

The objective of this project is to create a POC (Proof of concept) of a microservice of notifications for use in other projects and to improve my knowledge of NestJS as well.

### Why NestJs?

In addition to learning, Nestjs is a great framework for working in agile teams that need a fast pace. As it is an opinionated framework, it provides a ready-made standard for developers and the only concern is with business rules. Layers, architectures, and all these things NestJs already has everything ready. So, in my opinion, NestJS is the best framework to work with NodeJs.

## # Logic and Business rules

- As it is a microservice model, it is very common to have duplicate data, so I created an attribute (`recipientId`) in the Notification table to identify the user who called this service, which is a reference to information that is in another service.
- Architecture:
  - Infra: External layer (e.g. Database, controllers, connection with other API's);
  - Application: Logic that is independent of frameworks, other services and any external layer;
- Using In Memory Repository to perform unit tests and not depend on the external database (tip from Martin Fowler);
### # Technologies used

- NestJS
- SQLite
- Prisma

<br /><br />

## Installation, Running & Test

```bash
$ pnpm install
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

# unit tests
$ pnpm run test
```

<h3>After that, if you want test the endpoints on VSCode:<br /></h3>
<h3>Install the extesion "REST Client" -> Open the file "client.http" on root directory -> Click in "Send" on each route http.</h3>

## License

Nest is [MIT licensed](LICENSE).
