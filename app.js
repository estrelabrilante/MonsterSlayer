// /Regular javascript function (only call inside from javascript code which will not use any Vue properties and call from inside template/HTML code)/////////
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;

  //   return Math.random() * (max - min) + min;
}

//************Vue instance config object ***************
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null, //initially no winner (null is falsy value in javascript)
      logMessages: [],
    };
  },
  methods: {
    startGame() {
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.currentRound = 0),
        (this.winner = null);
      this.logMessages = [];
    },
    attackMonster() {
      console.log("started game");
      this.currentRound++;
      //calculating RANDOM number between maximum of 12 and minimum of 5 while attacking monster by player;
      //   const attackValue = Math.floor(Math.random() * (12 - 5)) + 5;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      console.log("started monster attack");
      this.addLogMessage("player", "attack", attackValue);
      //   this.monsterHealth -= attackValue;
      //   whenever attack monster trigger the attackPlayer function
      console.log("triggered PLAYER Attack function");
      this.attackPlayer();
    },
    attackPlayer() {
      //calculating RANDOM number between maximum of 15 and minimum of 8 while attacking player by monster;
      //   const attackValue = Math.floor(Math.random() * (15 - 8)) + 8;
      console.log("started player attack");
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage("player", "special-attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      console.log("healing");
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        return (this.playerHealth = 100);
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      // push function : adds something in the end of array
      // unshift function: adds something at the beginning of the array
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },

  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0 %" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0 %" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    // access every 3 round
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    //   Who won or lost by checking health of monster and player
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // a draw between monster and player
        this.winner = "draw";
      } else if (value <= 0) {
        //player lost , monster won
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // a draw between monster and player
        this.winner = "draw";
      } else if (value <= 0) {
        //monster lost , player won
        this.winner = "player";
      }
    },
  },
});
app.mount("#game");
