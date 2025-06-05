<template>
  <section :class="['cta-section', setClass]">
    <b-container>
      <div class="cta-content">
        <h2 class="cta-title" v-html="ctaTitle"></h2>
        <div class="cta-buttons">
          <component :is="isExternal(buttonUrl) ? 'a' : 'nuxt-link'" :href="isExternal(buttonUrl) ? buttonUrl : null"
            :to="!isExternal(buttonUrl) ? buttonUrl : null" class="btn btn-primary" target="_blank" rel="noopener">
            {{ buttonText }}
          </component>
          <component v-if="button2Url" :is="isExternal(button2Url) ? 'a' : 'nuxt-link'"
            :href="isExternal(button2Url) ? button2Url : null" :to="!isExternal(button2Url) ? button2Url : null"
            class="btn btn-primary" target="_blank" rel="noopener" style="margin-left: 16px;">
            {{ button2Text }}
          </component>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'CtaSection',
  props: {
    ctaTitle: {
      type: String,
      default: 'Love What you See?'
    },
    buttonUrl: {
      type: String,
      default: '/contact-us'
    },
    buttonText: {
      type: String,
      default: 'BOOK A FREE CONSULT'
    },
    button2Url: {
      type: String,
      default: ''
    },
    button2Text: {
      type: String,
      default: 'SECONDARY ACTION'
    },
    setClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    isExternal(url) {
      return /^(http|https):\/\//.test(url);
    }
  }
}
</script>

<style scoped>
.cta-section {
  text-align: center;
}

.cta-section.left {
  text-align: left;
}

.cta-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-section.left .cta-content {
  align-items: flex-start;
}

.cta-title {
  font-size: 1.5rem;
  margin-bottom: 32px;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.cta-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
}

.btn-primary {
  color: #000;
  text-transform: uppercase;
  border: 1px solid #000;
  background: transparent;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  padding: 15px 50px;
}

.btn-primary:hover {
  background: #000;
  color: #fff;
}

.cta-section.left .cta-buttons {
  justify-content: flex-start;
}
</style>