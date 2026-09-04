import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_APP_CLIENT_ID || 'dummy_id_to_bypass_build_check',
  clientSecret: process.env.KEYSTATIC_GITHUB_APP_CLIENT_SECRET || 'dummy_secret_to_bypass_build_check',
  secret: process.env.KEYSTATIC_SECRET || 'dummy_secret_to_bypass_build_check',
});
