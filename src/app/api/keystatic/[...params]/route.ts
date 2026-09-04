import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

let handler: any;

function getHandler() {
  if (!handler) {
    handler = makeRouteHandler({ config });
  }
  return handler;
}

export const GET = (req: any, ctx: any) => getHandler().GET(req, ctx);
export const POST = (req: any, ctx: any) => getHandler().POST(req, ctx);
