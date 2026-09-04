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

export const GET = async (req: any, ctx: any) => {
  try {
    return await getHandler().GET(req, ctx);
  } catch (e: any) {
    return new Response(`Keystatic Route Error: ${e.message}\nStack: ${e.stack}`, { status: 500 });
  }
};

export const POST = async (req: any, ctx: any) => {
  try {
    return await getHandler().POST(req, ctx);
  } catch (e: any) {
    return new Response(`Keystatic Route Error: ${e.message}\nStack: ${e.stack}`, { status: 500 });
  }
};
