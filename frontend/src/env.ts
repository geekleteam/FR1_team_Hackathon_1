import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_APP_BASE_URL: z.string().min(1),
    VITE_APP_HOME_PATH: z.string().min(1).default('/'),
    VITE_APP_LOGIN_PATH: z.string().min(1).default('/login'),

    VITE_AUTH0_DOMAIN: z.string().min(1),
    VITE_AUTH0_CLIENT_ID: z.string().min(1),
    VITE_AUTH0_REDIRECT_URI: z.string().url().min(1),
  },
  runtimeEnv: {
    VITE_APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL,
    VITE_APP_LOGIN_PATH: import.meta.env.VITE_APP_LOGIN_PATH,

    VITE_AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
    VITE_AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
    VITE_AUTH0_REDIRECT_URI: import.meta.env.VITE_AUTH0_REDIRECT_URI,
  },
});
