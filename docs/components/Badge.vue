<script>
import { h } from 'vue'

export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'tip',
    },
    text: {
      type: String,
      default: '',
    },
    vertical: {
      type: String,
      default: 'top',
    },
  },
  render(props, slots) {
    return h(
      'span',
      {
        class: ['badge', props.type],
        style: {
          verticalAlign: props.vertical,
        },
      },
      props.text || slots().default
    )
  },
}
</script>

<style scoped>
.badge {
  display: inline-block;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  color: white;
  background-color: #42b983;
}
.badge.tip,
.badge.green {
  background-color: #42b983;
}
.badge.error {
  background-color: #da5961;
}
.badge.warning,
.badge.warn,
.badge.yellow {
  background-color: #ffe564;
}
.badge + .badge {
  margin-left: 5px;
}
</style>
