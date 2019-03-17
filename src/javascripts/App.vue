<template>
  <div>
    <p>
      <img class="logo" src="../images/logo.jpg" alt="ロゴ">
      <span class="sample">テスト</span>
    </p>
    <form @submit="onSubmit">
      名前: <input v-model="$data.name" type="text"><br>
      テキスト: <input v-model="$data.text" type="text">
      <button type="submit">送信</button>
    </form>
    <p>チャットリスト</p>
    <div class="chat_win" v-for="item in items">
      <!-- チャットウィンドウの構成-->
      <div class="chat_name">NN: {{ item.childName }}</div>
      <div class="chat_time">{{ item.time }}</div>
      <div class="chat_text">Message:<br>{{ item.childText }}</div>
    </div>
    <div class="botui-app-container" id="chat-app">
      <!-- チャットボットの表示-->
      <bot-ui></bot-ui>
    </div>
  </div>
</template>

<script>
import socket from './utils/socket';

// components
import MyComponent from './components/MyComponent.vue';

import moment from 'moment';

export default {
  components: {
    MyComponent
  },
  data() {
    return {
      message: '',
      text: '',
      name: '',
      clear: '',
      items: [
      ]
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
    });
    socket.on('name_send', (clear) => {
      console.log(clear);
      this.$data.clear = clear;
    });
    socket.on('send', (message) => {
      console.log(message);
      this.$data.message = message;
    });
  },
  methods: {
    /**
     * Enterボタンを押したとき
     */
    onSubmit(e) {
      e.preventDefault();
      socket.emit('name_send', this.$data.name);
      socket.emit('send', this.$data.text);
      this.items.push({ childName: this.$data.name, childText: this.$data.text, time: moment().format('YYYY/MM/DD HH:mm:ss') });
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
}

.sample {
  color: $red;
}

ul {
  list-style: none;
}

.chat_win {
  float: none;
  background-color: brown;
  width: 600px;
  height: 105px;
  padding: 10px;
  border: 10px solid white;
}

.chat_name {
  background-color: beige;
  width: 250px;
  height: 15px;
  float: left;
  padding: 5px 25px 5px 25px;
}

.chat_time {
  background-color: cadetblue;
  width: 250px;
  height: 15px;
  float: right;
  padding: 5px 25px 5px 25px;
}

.chat_text {
  background-color: bisque;
  width: 550px;
  height: 70px;
  float: left;
  padding: 5px 25px 5px 25px;
}

</style>
