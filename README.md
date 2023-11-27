# GitHub API Nest

This is the backend repository for the GitHub Frontend Next.js app. It is responsible for handling REST routes, communicating with the GitHub API, and managing user authentication and data.


## Features

- REST routes for communication with the frontend.
- Fetches data from the GitHub API and returns it to the frontend.
- All routes (except login) are protected, requiring a token for authentication.
- User data is saved in the database.


## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MariaDB](https://mariadb.org/)
- [Passport](http://www.passportjs.org/)
- [JWT](https://jwt.io/)
- [Axios](https://axios-http.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Class Transformer](https://github.com/typestack/class-transformer)
- [Class Validator](https://github.com/typestack/class-validator)
- [RxJS](https://rxjs.dev/)

## Scripts

- `npm run build`: Build the NestJS application.
- `npm run start`: Start the NestJS application.
- `npm run start:dev`: Start the NestJS application in watch mode.
- `npm run start:prod`: Start the NestJS application in production mode.
- `npm run test`: Run Jest tests.
- `npm run test:watch`: Run Jest tests in watch mode.
- `npm run test:cov`: Run Jest tests with coverage.
- `npm run test:debug`: Run Jest tests in debug mode.
- `npm run test:e2e`: Run end-to-end tests.


Feel free to reach out if you have any questions or need further assistance!
