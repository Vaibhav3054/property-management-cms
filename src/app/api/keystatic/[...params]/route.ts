export const runtime = 'edge';
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

let handler: any;

function getHandler() {
  if (!handler) {
    handler = makeRouteHandler({ 
      config,
      clientId: process.env.KEYSTATIC_GITHUB_APP_CLIENT_ID,
      clientSecret: process.env.KEYSTATIC_GITHUB_APP_CLIENT_SECRET,
      secret: process.env.KEYSTATIC_SECRET,
    });
  }
  return handler;
}

export const GET = (req: any, ctx: any) => getHandler().GET(req, ctx);
export const POST = (req: any, ctx: any) => getHandler().POST(req, ctx);
