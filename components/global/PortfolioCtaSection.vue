<template>
  <section class="portfolio-cta-section">
    <a href="#" @click.prevent="scrollToTop" class="portfolio-cta-link mobile-link">
            BACK TO TOP
          </a>
      <div class="portfolio-cta-content container--xl">
        <div class="portfolio-cta-left">
          <h2 class="portfolio-cta-title" v-html="ctaTitle"></h2>
          <nuxt-link :to="buttonUrl" class="portfolio-cta-link">
            {{ buttonText }}
          </nuxt-link>
        </div>
        <div class="portfolio-cta-right">
          <a href="#" @click.prevent="scrollToTop" class="portfolio-cta-link">
            BACK TO TOP
          </a>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  name: 'PortfolioCtaSection',
  props: {
    ctaTitle: {
      type: String,
      default: 'Love what you see?'
    },
    buttonUrl: {
      type: String,
      default: '/contact-us'
    },
    buttonText: {
      type: String,
      default: "LET'S WORK TOGETHER"
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.portfolio-cta-section {
  padding: 4rem 2rem;
  
  .portfolio-cta-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    min-height: 7.5rem;
  }
  
  .portfolio-cta-left {
    flex: 1;
  }
  
  .portfolio-cta-title {
    color: var(--Murnane-Cinnamon-Web, #380E11);
    font-family: "ivarfine-light";
    font-size: 4rem;
    letter-spacing: 0.08rem;
    margin-bottom: 2rem;
    line-height: 1.2;
  }
  
  .portfolio-cta-link {
    color: var(--Murnane-Cinnamon-Web, #380E11);
    font-family: Indivisible;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    text-decoration: none;
    text-underline-offset: 0.3125rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.3125rem;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: currentColor;
      transform: scaleX(1);
      transform-origin: right;
      transition: transform 0.5s ease-out;
    }
    
    &:hover {
      &::after {
        transform: scaleX(0);
      }
    }
    
    &.mobile-link {
      display: none;
    }
  }
  
  .portfolio-cta-right {
    align-self: flex-end;
  }
}
@media (max-width: 768px) {
  .portfolio-cta-section {
    .portfolio-cta-content {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    
    .portfolio-cta-title {
      font-size: 2.1rem;
    }
    
    .portfolio-cta-right {
      display: none;
    }

    .portfolio-cta-left {
      text-align: center;
    }

    .portfolio-cta-link {
      font-size: 0.875rem;
      
      &.mobile-link {
        display: block;
        text-align: center;
        margin-bottom: 6.25rem;
      }
    }
  }
}
</style> 