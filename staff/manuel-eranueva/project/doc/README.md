# Bookself

## Intro

The idea of the app is to connect users who loves to read. Reading can be such an expensive hobbie, and despite the price, some books can be read in a few hours. 

Although there's a huge number of public libraries in Barcelona, they usually don't have a big comic section, or a scientific section. Novels are usually easy to find, but out of the fiction popular books, it can be hard to find specific books, so the main idea is to share books while meeting new people. No monetary transactions are allowed inside the app, the main idea is to share a hobby and make friends, the app is not designed to make bussiness.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHV6ZTFvYWhkb2loZjhidXZ4ejRzeWR2em5weWlsYmk3OW4xNWNuaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5SMSlLBkJk2eA/giphy.gif)

## Functional Description

### Use Cases

- search a book
- create your own bookself with the books you own
- scroll through the cards that other users post
- create your own cards, to share with the community the books you want to read
- connect with other users using the cards
- update both libraries (bookself and community cards)

v0.1

- a rating system for the books you read
- recommendations based on the books you have loved
- bigger personalization of the profile, including favourite genres
- check wich books you are actually sharing and when they should be returned
- share wich books you have to retrieve and when
- rate users
- see in a map the relative position of the user with wich you are speaking
- open a chat with other user when both of you are interesteed in exchanging

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
- id (User.id, required)
- name (string, required)
- username (string, required)
- email (string, required)
- password (string, required)

Book
- id (Book.id, required)
- image (string, required)
- author (string, required)
- name (string, required)

My bookself
- id (MyBookself.id, required)
- book (Book.id, required)
- owner (User.id, required)

Card 
- id (Card.id, required)
- book (Book.id, required)
- owner (User.id, required)
