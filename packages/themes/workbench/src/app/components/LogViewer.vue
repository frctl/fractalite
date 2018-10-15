<template>
  <ul class="log">
    <li v-for="(log, index) in logs" class="line" :class="[log.level, {open: isOpen(index)}, {hasData: log.data}]" @click="toggle(index)">
      <div class="summary">
        <span class="level" v-if="log.level">{{ log.level }}</span>
        <span class="message">{{ log.message }}</span>
        <span class="timestamp" v-if="log.date">{{ log.date.getHours() }}:{{ log.date.getMinutes() < 10 ? '0' : '' }}{{ log.date.getMinutes() }}:{{ log.date.getSeconds() }}</span>
      </div>
      <div class="details" v-if="log.data">{{ log.data }}</div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, remove } from 'lodash';

export default {
  data() {
    return {
      opened: []
    };
  },
  computed: {
    ...mapGetters(['logs'])
  },
  updated() {
    this.scrollToEnd();
  },
  methods: {
    isOpen(index) {
      return this.opened.includes(index);
    },
    toggle(index) {
      const opened = this.opened;
      if (this.isOpen(index)) {
        this.opened = remove(opened, index);
      } else {
        opened.push(index);
        this.opened = uniq(opened);
      }
    },
    scrollToEnd: function() {
      this.$nextTick(() => {
        this.$el.scrollTop = this.$el.lastElementChild.offsetTop;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.log {
  font-size: 13px;
  line-height: 1.4;
  font-family: monospace;
  color: #555;
  height: 100%;
  overflow-y: auto;
}

.line {
  padding: 2px 6px;
  word-wrap: break-word;
}

.line {
  border-bottom: 1px solid #eee;
}

.summary {
  display: flex;
}

.timestamp {
  font-style: italic;
  color: #aaa;
  flex: 0;
  margin-left: auto;
  padding-left: 5px;
  display: inline-block;
}

.level {
  font-weight: bold;
  flex: 0;
  margin-right: 5px;
}

.message {
  flex: 1;
}

.details {
  padding-left: 10px;
  color: #777;
  display: none;
}

.line.open .details {
  display: block;
}

.line.hasData {
  cursor: pointer;
}

.error .level,
.error .message {
  color: #ff0000;
}

.warn .level {
  color: #ff9400;
}

.debug {
  color: #888;
  .level {
    color: #666;
  }
}

.success {
  .level {
    color: #009708;
  }
}
</style>
