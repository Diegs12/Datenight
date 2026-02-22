import posthog from 'posthog-js';

let initialized = false;

export function initAnalytics() {
  try {
    if (process.env.REACT_APP_POSTHOG_KEY && !initialized) {
      posthog.init(process.env.REACT_APP_POSTHOG_KEY, {
        api_host: 'https://app.posthog.com',
        autocapture: true,
        capture_pageview: true,
      });
      initialized = true;
    }
  } catch (e) {}
}

export function track(event, props = {}) {
  try { posthog.capture(event, props); } catch (e) {}
}

export function identify(email, props = {}) {
  try { posthog.identify(email, { email, ...props }); } catch (e) {}
}

export function reset() {
  try { posthog.reset(); } catch (e) {}
}
