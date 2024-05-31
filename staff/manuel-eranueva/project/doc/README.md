# Bookself

## Intro

I developed this app to connect book enthusiasts and facilitate the sharing of literature without any monetary exchange. I believe in promoting an open and horizontal culture, where people can distribute knowledge and connect with others who share similar interests.

Reading can often be an expensive hobby, with some books being devoured in just a few hours. Despite the abundance of public libraries in Barcelona, finding specific books can be challenging unless they are popular novels.

This app aims to bridge that gap by encouraging users to share their personal collections and meet new people. By fostering a community of readers who share their favorite books, I create a space where literature can be enjoyed and friendships can flourish. Remember, the app is strictly for sharing passions and connecting with fellow readers, not for conducting business.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHV6ZTFvYWhkb2loZjhidXZ4ejRzeWR2em5weWlsYmk3OW4xNWNuaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5SMSlLBkJk2eA/giphy.gif)

## Functional Description

### Use Cases

- register a user
- login
- logout
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

- Javascript
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

My bookself {}
- id (MyBookself.id, required)
- book (Book.id, required)
- owner (User.id, required)

Card 
- id (Card.id, required)
- book (Book.id, required)
- owner (User.id, required)
