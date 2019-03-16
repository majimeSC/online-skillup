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
    <MyComponent :clear="$data.clear" />
    <MyComponent :message="$data.message" />
    <ul id='message_list'></ul>
  </div>
</template>

<script>
import socket from './utils/socket';

// components
import MyComponent from './components/MyComponent.vue';

export default {
  components: {
    MyComponent
  },
  data() {
    return {
      message: '',
      text: '',
      name: '',
      clear: ''
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
    });
    socket.on('name_send', (clear) => {
      console.log(clear);
      this.$data.clear = clear;
      const element = document.createElement('li');
      element.setAttribute('id', 'chat_list');
      element.innerHTML = String(clear);
      document.getElementById('message_list').appendChild(element);
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
</style>
