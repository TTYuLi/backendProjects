<template>
  <div class="model" v-show="visible">
    <transition :name="transitionNames[1]">
        <div :class="maskClasses" :style="wrapStyles" v-show="visible" v-if="showMask" @click="handleMask"></div>
    </transition>
    <div></div>
    <transition :name="transitionNames[0]" @after-leave="animationFinish">
      <div class="modal-inner" :style="{width: width+ 'px', maxHeight: maxHeight +'px'}">
      <div class="modal-close" @click="close">X</div>
      <div class="modal-header">
        <slot name="header">
          <div class="modal-title">
            {{title}}
          </div>
        </slot>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer" v-if="!footerHide">
        <slot name="footer">
          <button @click="cancel">取消</button>     
          <button @click="ok">确定</button>
        </slot>
      </div>

      </div>

    </transition>
  </div>
</template>

<script>
  const prefixCls = 'ztw-modal';
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 520
    },
    mask: {
      type: Boolean,
      default: true
    },
    footerHide: {
        type: Boolean,
        default: false
    },
    transitionNames: {
        type: Array,
        default () {
            return ['ease', 'fade'];
        }
    },
    maskClosable: {
        type: Boolean,
        // default () {
        //     return !this.$IVIEW || this.$IVIEW.modal.maskClosable === '' ? true : this.$IVIEW.modal.maskClosable;
        // }
    },
    
  },
  data(){
    return {
      prefixCls: prefixCls,
      showHead: true,
      showMask: true,
      maxHeight: 800,
      visible: this.value,
      // modalIndex: this.handleGetModalIndex(),  // for Esc close the top modal
      show: 'blocks'
    }
  },
  methods: {
    cancel(){
      this.visible = false
      this.$emit('input', false)
      this.$emit('on-cancel')
    },
    ok(){
      this.visible = false
      this.$emit('input', false)
      this.$emit('on-ok')

    },
    close(){
      this.visible = false
      this.$emit('input', false)
      this.$emit('on-cancel')
    },
    handleMask () {
        if (this.maskClosable && this.showMask) {
            this.close();
        }
    },
    // handleGetModalIndex () {
    //     modalIncrease();
    //     return modalIndex;
    // },
    animationFinish() {
      this.$emit('on-hidden');
    },
  },
  computed: {
    wrapClasses () {
        return [
            `${prefixCls}-wrap`,
            {
                [`${prefixCls}-hidden`]: !this.wrapShow,
                [`${this.className}`]: !!this.className,
                [`${prefixCls}-no-mask`]: !this.showMask
            }
        ];
    },
    maskClasses () {
        return `${prefixCls}-mask`;
    },
    wrapStyles () {
        return {
            // zIndex: this.modalIndex + this.zIndex
            zIndex: 99 + this.zIndex
        };
    },
  },
  watch: {
    value(val) {
      console.log(val)
      this.visible = val;
    }
  }
}
</script>

<style lang="less" scoped>
.model {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background:  rgba(55,55,55,.6);
  z-index: 999;
  .modal-inner {
    position: relative;;
    background: #fff;
    width: 520px;
    top: 20%;
    margin: 0 auto;
    border-radius: 10px;
  }
  .modal-header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    line-height: 1;
    .modal-title {
      display: inline-block;
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #17233d;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .modal-close {
    z-index: 1;
    font-size: 22px;
    position: absolute;
    right: 24px;
    top: 14px;
    overflow: hidden;
    cursor: pointer;
  }
  .modal-body {
    padding: 16px;
    font-size: 12px;
    line-height: 1.5;
  }
  .modal-footer {
    border-top: 1px solid #e8eaec;
    padding: 12px 18px;
    text-align: right;
  }
}
 
</style>
