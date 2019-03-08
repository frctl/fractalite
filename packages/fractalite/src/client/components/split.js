import Split from 'split.js';

// Adapter

export default {
  template: `
    <div class="split-container"
      :class="{'split-container--horizontal': direction === 'horizontal'}">
      <slot></slot>
    </div>
  `,
  props: {
    elements: {
      // Array of target split element ids
      type: Array,
      required: true,
      validator(value) {
        // must be array of strings
        const isValid = value.every(i => typeof i === 'string');
        if (!isValid) {
          console.error(`VueSplitJs: Invalid elements - "${value}". Must be array of strings`);
        }
        return isValid;
      }
    },
    direction: {
      // Direction to split: horizontal or vertical.
      type: String,
      default: 'horizontal',
      validator(value) {
        let allowedValues = ['horizontal', 'vertical'];
        const isValid = allowedValues.includes(value);
        if (!isValid) {
          console.error(`VueSplitJs: Invalid direction - "${value}". Possible values are "horizontal" or "vertical"`);
        }
        return isValid;
      }
    },
    sizes: {
      // Initial sizes of each element in percents.
      type: Array,
      default: null
    },
    minSize: {
      // Minimum size of each element in pixels.
      type: [Number, Array],
      default: 100
    },
    gutterSize: {
      // Gutter size in pixels.
      type: Number,
      default: 10
    },
    snapOffset: {
      // Snap to minimum size offset.
      type: Number,
      default: 30
    },
    cursor: {
      // Cursor to display while dragging.
      type: String,
      default: 'grabbing'
    }
  },
  mounted() {
    Split(this.elements, {
      direction: this.direction,
      sizes: this.sizes,
      minSize: this.minSize,
      gutterSize: this.gutterSize,
      snapOffset: this.snapOffset,
      cursor: this.cursor,
      onDrag: this.onDrag,
      onDragStart: this.onDragStart,
      onDragEnd: this.onDragEnd
    });
  },
  methods: {
    onDrag() {
      this.$emit('onDrag');
    },
    onDragEnd(sizes) {
      this.$emit('onDragEnd', sizes);
    },
    onDragStart() {
      this.$emit('onDragStart');
    }
  }
};
