## Summary

This is a simple backend API for Cake-pals application

## Stack used

- Backend Framework: Nestjs
- Database: MySQL
- ORM: TypeORM
- Cache Manager: Redis
- Documentation: Swagger (Open API)
- Docker

## Get Started

- Clone Repo
- Make sure latest version of docker is installed

## Running the app

To run the project use the following command:

```bash
docker-compose build
docker-compose --env-file .env.dev up
```

## Documentation

- to check docs visit localhost:3000/api/v1
- download postman collection from localhost:3000/api/v1-json

# test coverage

```bash
docker run cake-pals npm run test:cov
```

## Roadmap

| Task                                 | Completed Percentage |
| ------------------------------------ | -------------------- |
| Setup Framework and Dependencies     | 100%                 |
| Write DB Migrations                  | 100%                 |
| Configure Redis as Cache Manager     | 100%                 |
| Users API Endpoints                  | 100%                 |
| Create User and Baker Authentication | 100%                 |
| Users API Endpoints                  | 100%                 |
| Bakers API Endpoints                 | 100%                 |
| Products API Endpoints               | 100%                 |
| Orders API Endpoints                 | 100%                 |
| Unit Testing                         | 20%                  |
| E2E Testing                          | 0%                   |
| API Security                         | 50%                  |
| API Throttling                       | 0%                   |
| API Pagination                       | 0%                   |
| Dockerized Development Environment   | 100%                 |
| Kubernetes Deployment Script         | 0%                   |
| Documentation                        | 70%                  |
| Scalability                          | 90%                  |

## License

Nest is [MIT licensed](LICENSE).
