import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Netlify Environment Variable Injection Test',
    siteUrl: 'https://www.yourdomain.tld',
  },
  plugins: [
    'gatsby-plugin-typescript',
  ],
  graphqlTypegen: true,
};

export default config;
