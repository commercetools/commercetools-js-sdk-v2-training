import type { default as FetchFunc } from 'node-fetch';

declare global {
    const fetch: typeof FetchFunc;
}

declare module "chalk-animation"
