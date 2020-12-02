import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: [
      "", "", "",
      "", "", "",
      "", "", "",
    ],
    winState: undefined,
    gameModes: [
      {
        label: '2 PLAYERS',
        twoPlayers: true,
        harder: undefined,
      },
      {
        label: 'HARD-ISH',
        twoPlayers: false,
        harder: false,
      },
      {
        label: 'HARDER',
        twoPlayers: false,
        harder: true,
      }
    ],
    gameMode: {
      label: 'HARDER',
      twoPlayers: false,
      harder: true,
    },
    currentPlayer: 'X'
  },
  mutations: {
    setGame(state, game) {
      state.game = game;
    },
    setWinState(state, winState) {
      state.winState = winState;
    },
    resetState(state) {
      state.winState = undefined;
      state.currentPlayer = 'X';
      state.game = state.game.map(() => '');
    },
    togglePlayer(state) {
      state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
    },
    toggleGameMode(state) {
      let selectedMode = this.state.gameModes.indexOf(this.state.gameMode);

      const nextMode = ++selectedMode%this.state.gameModes.length;
      const nextGameMode = this.state.gameModes[nextMode];

      this.commit("resetState");
      state.gameMode = nextGameMode;
    }
  },
  modules: {
  },
});
