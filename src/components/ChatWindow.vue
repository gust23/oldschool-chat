<template>
  <div class="chat-window">
    <div class="error" v-if="error">{{ error }}</div>
    <div ref="scroll" v-if="documents" class="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="name">
          <span class="created-at">{{ doc.createdAt }} </span> {{ doc.name }}:</span
        >
        <span class="message">{{ doc.message }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection';
import { formatDistanceToNow } from 'date-fns';
import { computed } from '@vue/reactivity';
import format from 'date-fns/format';
import { onUpdated } from '@vue/runtime-core';
import { ref } from 'vue';
export default {
  setup(props) {
    const scroll = ref(null);
    onUpdated(() => {
      scroll.value.scrollTop = scroll.value.scrollHeight;
    });

    const { error, documents } = getCollection('messages');
    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((item) => {
          let time = format(item.createdAt.toDate(), 'H:mm:ss');
          return { ...item, createdAt: time };
        });
      }
    });

    return { error, documents, formattedDocuments, scroll };
  },
};
</script>

<style scoped>
.messages::-webkit-scrollbar {
  display: none;
}

.chat-window {
  background: rgb(32, 32, 32);
  padding: 30px 20px;
  margin: 0 10px;
  border: 2px ridge #ccc;
  max-width: 100%;
}

.single {
  margin: 14px 0;
}
.created-at {
  display: inline-block;
  color: #999;
  font-size: 12px;
}
.name {
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
  color: #ccc;
}
.message {
  color: #ccc;
  font-size: 14px;
  display: inline-block;
}
.messages {
  max-height: 400px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
