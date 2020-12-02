## Serve and Build instructions


#### Install

```
cd ${air-tame-toe-root}
npm i
```

#### Serve for development

```
cd ${air-tame-toe-root}
npm run serve
```
Open the address the terminal shows, ctrl + click on address

#### Build

```
cd ${air-tame-toe-root}
npm run build
```

Build script will add a dist folder to root

#### Test build

###### Requires serve npm package
```
sudo npm install -g serve
```

###### Serve dist

```
cd ${air-tame-toe-root}
serve -s dist
```
Open the address the terminal shows, ctrl + click on address

## Design and Implementations choices


#### Difficulty
I tried to create 2 levels of difficulty, that still leave space for winning, however currently it would not be hard to adapt the third, impossible, mode(Minimax).

**Those levels being:**
* hard-ish - computer determines if there is any position open for the user to win and tries to block the move, does not programmatically win, only by chance.
* harder - computer behaves the same as hard-ish but this time determines if there is a possible win move and prioritizes it over lose move. we can look it as offensive/defensive.

Minimax function, while technically impressive leaves little challenge to the user(as in, guaranteed non-win) and would be just adapting a well known strategy to my particular instance.

#### Design
As for design choices, i tried to be as minimalistic as possible while being as striking as possible, as evidenced in the game over ~~jump scare~~ overlay, and the board's big size, at least in desktop mode.

I kept fairly close to the original design, dimming down a bit the contrasting colors for less strain while playing for long stretches(or developing it)

Added a moderately intense color for accents,  for a little of flair and character.

###### UI
I would have liked to add a better way to make the game mode button more visible as a button, maybe a underline, or a short tri-state slider under the label.

Might even just reuse the overlay mixin to build a overlay UI tutorial on first load

###### Styling
Added reasonably basic responsive design with the help of min(add a little run in with Sass and css overlapping function names) and calc functions for mobile users.

Would like to reduce the number of magic numbers in CSS

#### 2D array vs flat array
Im still not sure if disregarding common advice to make a 2D array for the board and instead just using a 9 value array was a good idea or not

On one hand it allows me to not have loops of loops everywhere, on the other, i think i might have made my job worse on the functions to find BOTH diagonals as manifested in the compensator variable

Either way, i think the implementation of organic rules like these ones would be hard in both systems and actually find it easier to reason with a flat array

#### Setbacks and justifying implementation choices
Initially the project started as a basic component webpage, but i scratched that in favour of a app with routing and state management store,
both allow me to control certain behaviours in a much more reasonable way, store to react to global changes and avoid prop drilling, router to redirect all routes to the game.

While not necessary in such a small project, it allows for a happier developer and better scalability.

#### if it was your main project, what would be your next move? What do you think is missing to your solution?
Next move, allow online 2 player games or maybe(if this was a more serious game) a replay of your older games(step by step) with others and computers so power users could learn from their past matches.

The obvious thing that is missing is user's ability to choose which cell he has, X or O, because of the 2 player mode this would already be very easy to add, just add a button along side gamemode:
###### Pseudo code of implementation
```
store.commit('resetState')
store.commit('togglePlayer')

if (currentPlayer == 'O') this.computerPlay()
```
There is this logic missing for the state variable currentComputer, so when computer plays its an X instead of O, on store.togglePlayer:
```
state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X'
state.currentComputer = state.currentPlayer === 'X' ? 'O' : 'X'
```
On board.computerPlay
```
this.commitPlay(chosenCell, this.currentComputer)
```