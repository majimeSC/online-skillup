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
    <ul class="text_list_frame">
      <li v-for="item in items">{{ item.childName }} - {{ item.childText }} - {{ item.time }}</li>
    </ul>
    <div class="chat_win">
      <!-- チャットウィンドウの構成-->
      <div class="chat_name">name</div>
      <div class="chat_text">text</div>
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
  float: left;
  background-color: brown;
  width: 300px;
  height: 150px;
}

.chat_name {
  background-color: beige;
  width: 70px;
}

.chat_text {
  background-color: bisque;
  width: 250px;
  height: 70px;
}
</style>
