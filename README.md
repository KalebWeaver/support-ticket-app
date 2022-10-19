# Support Ticket App

## Description
I began with this project to tackle some new concepts. I had worked with Redux-Toolkit in past projects using asyncThunks and using Axios to make basic CRUD calls to the backend. During those projects I had run into UI/UX issues with not being able to properly cache data to give the user a more responsive experience in dealing with data changes. Given this issue, I had decided to dip my toes into RTK Query with their Apollo/GraphQL like caching and query/mutation handling of data from a backend server. While simplistic on the users point of view, I had focused alot of the effort into more intricate functionality with the features described below.

## Features
- Fully built express server that serves the static frontend build for ease of deployment and simplicity.
- Protected API routes to protect backend from un-authorized requests from outside origin urls and un-authenticated users.
- Full JWT authentication including Access Tokens and Refresh Tokens.
- Redux Toolkit for handling state management.
- RTK Query to handle Caching and automatic rehydration of data sent to and from backend server
- Protected page routes to prevent un-authenticated users from viewing sensitive data. (This includes both users that are logged in and are not from viewing tickets)
- Role based handling of data. (Admins can view all tickets from everyone, while users can only see their own). 
- Basic messaging system to let users talk in depth about issues with admin.

## Packages 
- React
- Redux-Toolkit
- RTK Query
- Node.JS
- Express
- JsonWebToken
- Mongoose
- MongoDB