<template>
  <ul class="log">
    <li v-for="(log, index) in logs" class="line" :class="[log.level, {open: isOpen(index)}, {hasData: log.data}]" @click="toggle(index)">
      <span class="level">{{ log.level }}</span>
      <span class="message">{{ log.message }}</span>
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

.level {
  font-weight: bold;
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
