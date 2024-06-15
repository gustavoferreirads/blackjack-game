# Blackjack Game

## Introduction

This project is an implementation of the classic Blackjack (21) card game, using TypeScript for the backend and JavaScript for the frontend. The application is divided into several layers following principles of clean architecture, modularity, and scalability.

## About the Project

Blackjack is a card game where the goal is to have a hand whose total value is as close to 21 as possible without exceeding it. The basic rules of the game are:

- Numbered cards 2 to 10 are worth their face value.
- Face cards (Jack, Queen, King) are each worth 10 points.
- Aces can be worth 1 or 11 points, whichever is more advantageous for the hand.
- The player competes against the dealer, not against other players.

### Blackjack Rules

1. **Dealing Cards**: Each player and the dealer receive two cards. One of the dealer's cards is revealed.
2. **Player Actions**: The player can choose between "Hit" (take another card), "Stand" (keep the current hand), or "Double" (double the bet and receive one final card).
3. **Dealer Actions**: The dealer must continue to "Hit" until the hand totals at least 17 points.
4. **Winning Conditions**:
    - If the player's hand exceeds 21 points, the player loses (bust).
    - If the dealer's hand exceeds 21 points, the dealer loses (bust).
    - If the player has more points than the dealer without exceeding 21, the player wins.
    - If the dealer has more points than the player without exceeding 21, the dealer wins.
    - If there is a tie, the bet is returned to the player (push).

### Preview

![Blackjack Preview](./web/img/preview.gif)

### Limitations

- Only allows one player.

### Future Improvements

- **Multiplayer**: Implement functionality for multiple players.
- **Login and Database**: Add a login system and database to save scores.
- **Save Game State**: Implement functionality to save the game state and resume later.

## How to Run

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/ferreiratech/blackjack-game.git

2. Install dependencies:

   ```sh
   npm install

3. Start the server in development mode:

   ```sh
   npm run dev

## Technologies Used

- **Backend**: Node.js, TypeScript, Express
- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Build Tools**: Webpack
- **Testing**: Jest

## Architecture and Functionality

### Webpack + Express

The application uses Webpack to compile and bundle frontend files. The backend server is implemented using Express, serving static files compiled by Webpack, and providing APIs for game functionalities.

### High-Level Architecture


## Backend
The architecture supports scalable development by organizing features into self-contained modules. The separation into layers and the use of **Domain-Driven Design (DDD)** and **Hexagonal Architecture**: architecture allow changes and additions without negatively impacting the existing system. The project structure allows for easily adding adapters, such as replacing an HTTP adapter with an event-driven one, or transforming the system into a microservice that only handles game logic, delegating other responsibilities (multiplayer, user account, scoring, subscription billing) to other services.

- **Layers**:
    - **Infrastructure**: Implements communication with external systems and provides the necessary interfaces for the application to function.
        - **Scalability Example**: In `memory-game-storage.ts`, the `GameStorage` interface can easily be implemented to use a real database (like MongoDB or PostgreSQL) instead of in-memory storage without changing the rest of the application.
    - **Domain**: Contains business rules and game entities.
        - **Scalability Example**: The `Game` entity in `game.ts` can be expanded to support multiple players or new types of card games without altering the existing application logic.  
    - **Error Handling**: Manages errors and exceptions in the application.
     ration.
   - **Scalability Example**: New types of errors can be added in the `errors` directory, such as `AuthenticationError` or `AuthorizationError`, to support future login and access control functionalities.
 
    - **Application**: Implements use cases and application logic.
    - **Adaptability Example**: The project structure allows for easy swapping of adapters, such as changing the HTTP layer to an event-driven one or transforming the application into a microservice that only handles game logic, delegating other responsibilities (multiplayer, user account, scoring, subscription billing) to other services.

   
## Frontend

In this project, Vanilla JavaScript was used without any frameworks, applying a modularized pattern. This approach provides significant performance benefits by avoiding the overhead associated with libraries and frameworks, resulting in faster load times and smaller file sizes. Using Vanilla JavaScript ensures complete control over the code, allowing for specific optimizations and highly tailored application-specific code. Modularization enhances maintainability by breaking the code into smaller, more manageable parts, facilitating teamwork, and enabling code reusability, reducing duplication, and ensuring isolation of functionality to prevent unwanted side effects. This makes it easier to isolate and fix bugs. The project employs several design patterns such as Singleton, Observer, Module, and Factory, which promote efficient resource management, loose coupling, encapsulation, and data privacy. Asynchronous and conditional loading of resources, combined with minification, bundling, and efficient caching, further enhance load times and user experience. Tools like Webpack can minify and bundle modules, reducing the number of HTTP requests and improving network efficiency. By leveraging these techniques and patterns, the project achieves an optimal balance between performance, maintainability, and scalability, ensuring a smooth and efficient user experience, with the flexibility to adapt and scale features like multiplayer, user login systems, and state persistence in the future.

## Reusability

The codebase follows a clean code approach, ensuring that variable names are intuitive and self-documenting. We've established a components directory dedicated to UI elements, which can be reused across the application. This directory is poised for expansion to include a wider range of UI `components`, and it aligns with any 
forthcoming design system updates.

The app's design follows a combination of Domain-Driven Design (DDD), Modular, State Management, and Component Architecture patterns. These patterns form the foundation of our application's structure, enabling organized and scalable development.

### Design Patterns

- **Modularity**: Each frontend component has its own HTML, CSS, and JavaScript.
- **OOP**: Use of classes and objects to keep the logic well-structured and easy to maintain.
- **CSS3 and BEM**: Use of BEM (Block, Element, Modifier) methodology to write modular and reusable CSS.
- **Domain-Driven Design (DDD)** 
- **Hexagonal Architecture**

### Project Structure
  ```bash
public/
  ├── img/
  │   ├── bg.jpg
  │   ├── black-ribbon.svg
  │   ├── blue-ribbon.svg
  │   ├── chip.png
  │   ├── coin.png
  │   ├── logo.png
  │   ├── preview.gif
  │   └── red-ribbon.svg
  ├── web/
  │   ├── img/
  │   │   └── bg.jpg
  │   ├── 2d62b0cd2ca76a36a... (truncated file name)
  │   ├── alert.css
  │   ├── alert.html
  │   ├── bet-screen.css
  │   ├── bet-screen.html
  │   ├── bundle.js
  │   ├── bundle.js.LICENSE.txt
  │   ├── game-over-screen.css
  │   ├── game-over-screen.html
  │   ├── game-screen.css
  │   ├── game-screen.html
  │   ├── index.html
  │   ├── start-screen.css
  │   ├── start-screen.html

src/
  ├── application/
  │   └── GameApplication.ts
  ├── domain/
  │   ├── constants/
  │   │   ├── GameResult.ts
  │   │   ├── index.ts
  │   │   ├── Rank.ts
  │   │   ├── Suit.ts
  │   │   └── types.ts
  │   ├── errors/
  │   │   ├── BaseError.ts
  │   │   ├── DeckExhaustionError.ts
  │   │   ├── GameOverError.ts
  │   │   ├── InsufficientDoubleBalanceError.ts
  │   │   └── MultipleAcesError.ts
  │   ├── game/
  │   │   └── Game.ts
  │   ├── models/
  │   │   ├── Card.ts
  │   │   ├── Dealer.ts
  │   │   ├── Deck.ts
  │   │   └── Player.ts
  │   ├── types/
  │   │   └── GameState.ts
  │   ├── infrastructure/
  │   │   ├── http/
  │   │   │   └── server.ts
  │   │   ├── interfaces/
  │   │   │   └── GameStorage.ts
  │   │   └── store/
  │   │       └── InMemoryStore.ts

tests/
  ├── application/
  │   └── GameApplication.test.ts
  ├── domain/
  │   ├── models/
  │   │   ├── Card.test.ts
  │   │   ├── Deck.test.ts
  │   │   └── Player.test.ts
  │   ├── services/
  │   │   └── Game.test.ts
  ├── infrastructure/
  │   └── store/
  │       └── InMemoryStore.test.ts

web/
  ├── img/
  │   ├── bg.jpg
  │   ├── black-ribbon.svg
  │   ├── blue-ribbon.svg
  │   ├── chip.png
  │   ├── coin.png
  │   ├── logo.png
  │   ├── preview.gif
  │   └── red-ribbon.svg
  ├── src/
  │   ├── components/
  │   │   ├── alert/
  │   │   │   ├── alert.css
  │   │   │   ├── alert.html
  │   │   │   └── alert.ts
  │   │   ├── bet-screen/
  │   │   │   ├── bet-screen.css
  │   │   │   ├── bet-screen.html
  │   │   │   └── bet-screen.ts
  │   │   ├── game-over-screen/
  │   │   │   ├── game-over-screen.css
  │   │   │   ├── game-over-screen.html
  │   │   │   └── game-over-screen.ts
  │   │   ├── game-screen/
  │   │   │   ├── game-screen.css
  │   │   │   ├── game-screen.html
  │   │   │   └── game-screen.ts
  │   │   ├── start-screen/
  │   │   │   ├── start-screen.css
  │   │   │   ├── start-screen.html
  │   │   │   └── start-screen.ts
  │   ├── constants/
  │   │   ├── back-card.ts
  │   │   ├── result.ts
  │   │   ├── types.ts
  │   │   └── url.ts
  │   ├── modules/
  │   │   ├── base-component.ts
  │   │   ├── card-renderer.ts
  │   │   └── util.ts
  │   └── app.ts
  ├── styles/
  |   ├── global.css
  ├── index.html
  
.eslintrc.json
.gitignore
.prettierrc
jest.config.js
package-lock.json
package.json
readme.md
tsconfig.json
webpack.config.js
```


### Advantages of the Techniques Used

- **Scalability**: Facilitates the addition of new functionalities and components.
- **Optimization**: Organized and modular code improves performance and reduces load time.
- **Maintainability**: Clean and well-structured code makes it easier to identify and fix bugs.
- **Traceability**: Better code organization allows for easier tracking of functionalities and responsibilities.
