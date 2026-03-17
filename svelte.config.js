import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    files: {
      assets: 'public'
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
