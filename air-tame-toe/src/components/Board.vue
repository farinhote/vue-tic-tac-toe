<template>
  <div class="game">
    <div @click="toggleGameMode" class="toggle-two-players"> {{gameMode.label}} </div>
    <div class="board">
      <div
        v-for="(value, index) in game"
        :key="`cell${index}`"
      >
        <Cell
          :value="value"
          @cell-click="selectCell(index, value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Cell from "@/components/Cell.vue";

export default {
  name: "Board",
  components: {
    Cell,
  },

  computed: {
    game() {
      return this.$store.state.game;
    },

    winState() {
      return this.$store.state.winState;
    },

    gameMode() {
      return this.$store.state.gameMode;
    },

    currentPlayer() {
      return this.$store.state.currentPlayer;
    }
  },

  methods: {
    selectCell(index, value) {
      if (!value && !this.winState) {
        const winState = this.commitPlay(index, this.currentPlayer);

        if (this.gameMode.twoPlayers) {
          this.$store.commit("togglePlayer");
        } else {
          if (!winState) {
            this.computerPlay();
          }
        }
      }
    },

    computerPlay() {
      const nextMoveIndex = this.getNextMoveIndex();
      const chosenCell = !nextMoveIndex && nextMoveIndex !== 0
        ? Math.floor(Math.random() * this.game.length)
        : nextMoveIndex;

      if (this.game[chosenCell]) {
        return this.computerPlay();
      }

      this.commitPlay(chosenCell, "O");
    },

    commitPlay(index, value) {
      this.game[index] = value;
      this.$store.commit("setGame", this.game);

      this.$forceUpdate();

      return this.verifyWinState();
    },

    verifyWinState(index, value) {
      const game = this.game;
      const playsLeft = game.reduce((acc, play) => (play === "" ? acc + 1 : acc), 0);
      const { possibleWins } = this.getBoardState(game);
      const xWinState = "XXX";
      const oWinState = "OOO";

      const xWins = possibleWins.includes(xWinState);
      const oWins = possibleWins.includes(oWinState);

      // Conditional assigment of winstate
      const winner = (xWins && "X") || (oWins && "O");
      const draw = !playsLeft && !winner && "draw";
      const winState = winner || draw;

      this.$store.commit("setWinState", winState);

      return winState;
    },

    getNextMoveIndex() {
      const loseMove = this.getPossibleMove('XX');
      const winMove = this.gameMode.harder && this.getPossibleMove('OO');

      return winMove || loseMove;
    },

    getPossibleMove(value) {
      const { boardState } = this.getBoardState(this.game);
      const possibleMoveState = (line, state) => line.lineState === value;

      const horizontalLines = boardState.filter((item) => item.type === "horizontal");
      const verticalLines = boardState.filter((item) => item.type === "vertical");
      const diagonalLines = boardState.filter((item) => item.type === "diagonal");

      const findIndex = {
        horizontal: (item) => horizontalLines.indexOf(item),
        vertical: (item) => verticalLines.indexOf(item),
        diagonal: (item) => diagonalLines.indexOf(item)
      }

      // Finds a board index given a cell position in a line
      const getCellIndex = {
        horizontal: (possibleMoveIndex, index) => possibleMoveIndex * 3 + index,
        vertical: (possibleMoveIndex, index) => possibleMoveIndex + index * 3,
        diagonal: (possibleMoveIndex, index, compensator) => (index * 4 + compensator) - (compensator * index)
      }

      // Finds if there is any worthwhile move in any given direction
      const possibleMove = horizontalLines.find(possibleMoveState)
        || verticalLines.find(possibleMoveState)
        || diagonalLines.find(possibleMoveState);

      // Finds in what line on a give orientation there is a possible move
      const possibleMoveLineIndex = possibleMove
        ? findIndex[possibleMove.type](possibleMove)
        : undefined;

      let avoidLoseIndex = undefined

      if (possibleMove) {
        // Loops through all cells in any given line in any given direction
        for (let index = 0; index < 3; index++) {
          // Hindsight is 20/20
          const game = [ ...this.game ];
          const secondDiagonal = possibleMove.type === 'diagonal' && possibleMoveLineIndex === 1;
          const compensator = secondDiagonal ? 2 : 0;

          const boardIndex = getCellIndex[possibleMove.type](possibleMoveLineIndex, index, compensator);
          const boardValue = game[boardIndex];

          if (!boardValue) {
            avoidLoseIndex = boardIndex;
            break;
          }
        }
      }

      return avoidLoseIndex;
    },

    getBoardState(game) {
      const boardState = [];

      // Verticals and horizontals
      for (let index = 0; index < 3; index++) {
        boardState.push({
            lineState: `${game[index * 3]}${game[index * 3 + 1]}${game[index * 3 + 2]}`,
            type: 'horizontal'
          });
        boardState.push({
            lineState: `${game[index]}${game[index + 3]}${game[index + 6]}`,
            type: 'vertical'
          });
      }

      // Diagonals
      boardState.push({
          lineState: `${game[0]}${game[4]}${game[8]}`,
          type: 'diagonal'
        });
      boardState.push({
          lineState: `${game[2]}${game[4]}${game[6]}`,
          type: 'diagonal'
        });

      return {
        boardState,
        possibleWins: boardState.map((item) => item.lineState)
      };
    },

    toggleGameMode() {
      this.$store.commit("toggleGameMode");
    }
  },
};
</script>

<style scoped lang="scss">
.game {
  @include super-center();
  height: 100vh;
  grid-template-rows: auto 1fr;

  .board {
    @include board();

    background-color: $primary-color;
  }

  .toggle-two-players {
    @include button();
  }
}
</style>