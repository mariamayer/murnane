<template>
  <div class="animated-title">
    <h1 v-html="title"></h1>
    <div class="title-underline"></div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'AnimatedTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.initAnimation()
  },
  methods: {
    initAnimation() {
      const underline = this.$el.querySelector('.title-underline')
      
      // Initial state
      gsap.set(underline, {
        scaleX: 0,
        transformOrigin: 'left center'
      })

      // Hover animation
      this.$el.addEventListener('mouseenter', () => {
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.out'
        })
      })

      this.$el.addEventListener('mouseleave', () => {
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.5,
          ease: 'power2.in'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.animated-title {
  position: relative;
  display: inline-block;
  cursor: pointer;

  h1 {
    position: relative;
    z-index: 2;
  }

  .title-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #000;
    transform-origin: left center;
  }
}
</style> 