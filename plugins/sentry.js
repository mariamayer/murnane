import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'https://c58952695d9a48dbb20af8d17c2ba9fd@sentry.io/1771554',
  integrations: [new Integrations.Vue({Vue, attachProps: true})],
})
