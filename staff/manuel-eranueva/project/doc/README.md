# Comic App

## Intro

The idea of the app is to connect users who loves comic. Comic is such an expensive hobbie, and despite the price, can be read in a few hours. 

Although theres a huge number of public libraries in Barcelona, they usually don't have a big comic section, so the idea is to share books while meeting new people. No monetary transactions are allowed inside the app, the main idea is to share a hobby and make friends, the app is not designed to make bussiness.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHV6ZTFvYWhkb2loZjhidXZ4ejRzeWR2em5weWlsYmk3OW4xNWNuaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5SMSlLBkJk2eA/giphy.gif)

## Functional Description

### Use Cases

- search a comic
- create your own library with the comics you own
- create another library with the comics you wanna read
- scroll through the cards that other users post
- create your own cards, to share with the community the comics you want to read
- connect with other users using the cards
- update both libraries (books i have and books i want to read)
- open a chat with other user when both of you are interesteed in exchanging
- see in a map the relative position of the user with wich you are speaking

v0.1

- a rating system for the comics you read
- recommendations based on the books you have loved
- big meetings 
- bigger personalization of the profile, including favourite genres
- check wich books you are actually sharing and when they should be returned
- share wich books you have to retrieve and when
- rate users

### UI Design

[Figma]()

## Technical Description

### Modules

- api (server logic)
- app (client interface)
- com (common utils, tools, ...)

### Technologies 

- Typescript
- React
- Express
- Node
- Tailwind
- Mongo
- Figma
- Adobe Illustrator

### Data Model

User
- id (required)
- username (string, required)
- email (string, required)
- password (string, required)
- profile picture (optional)
- localization

All Books (main database)
- id (required)
- image (string, required)
- author (string, required)
- lenguaje (string, required)
- title (string, required)

Bookshelf
- books (objects extracted from 'All Books')
- availability (boolean, required, default true)

Wanna read
- books (objects extracted from 'All Books')

Black card (from me to other user)
- books (objects extracted from 'All Books')
- proximity
- other user
- date of creation

White card (from other user to me)
- books (objects extracted from 'All Books')
- proximity
- other user
- date of creation

Rainbow card (bidirectional)
- books (objects extracted from 'All Books')
- proximity
- other user
- date of creation

Chat
- id (required)
- user (string, required)
- date (date, required)
- messages (string, required)

Review
- id (required)
- user(User.id, required)
- rate (number, required, enum: 1|2|3|4|5)
