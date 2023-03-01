# Transport API 🚛

The project was created with:

- Typescript, Nest.js, PostgreSQL, Swagger

## Run Locally

Fork the repo

Clone the repo

```bash
  git clone https://github.com/blystsiv/transport-api
```

Go to the project directory

```bash
  cd transport-api
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn run start
```

## You can see all the requests with their responses by the link

If you changed Api port in .env please change it also here =>
[Link](http://localhost:5555/api/)

## How to use Transport Api

Before all steps do not forget to create a DB and fill all variables inside .env

"PASSENGER" - regular customer
"STATION" - admin

1. Create role "PASSENGER"
2. Create role "STATION"
3. Register
4. Login and get JWT
5. Add role "STATION" to your profile
6. Get new JWT (it will be updated with new role)
7. Create route
8. Create Bus for route
9. Create ticket for user
