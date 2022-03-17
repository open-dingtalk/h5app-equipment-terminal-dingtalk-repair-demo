// 自定义指令
import Vue from 'vue'
// 防止多次点击
export const preventReClick = Vue.directive('preventReClick', {
  inserted: function(el, binding) {
    el.addEventListener('click', function() {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 500)
      }
    })
  }
})
