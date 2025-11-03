import { Request, Response, NextFunction } from 'express';

// Method to log in console data from request

export const Logger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  const { method, originalUrl } = req;
  const ip = req.ip || req.socket.remoteAddress || 'Unknown IP';
  const userAgent = req.get('user-agent') ?? 'N/A';

  console.log('\n' + '='.repeat(80));
  console.log(`[${timestamp}] INCOMING REQUEST`);
  console.log('='.repeat(80));
  console.log(`   Method:      ${method}`);
  console.log(`   URL:         ${originalUrl}`);
  console.log(`   IP Address:  ${ip}`);
  console.log(`   User-Agent:  ${userAgent}`);

  if (req.body?.query) {
    console.log(`   GraphQL Query:`);
    console.log(`   ${req.body.query.replace(/\n/g, '\n   ')}`);

    if (req.body.variables) {
      console.log(`   Variables:   ${JSON.stringify(req.body.variables)}`);
    }
  }

  const originalSend = res.send.bind(res);
  res.send = (body?: any): Response => {
    const duration = Date.now() - startTime;

    console.log('─'.repeat(80));
    console.log(`OUTGOING RESPONSE`);
    console.log('─'.repeat(80));
    console.log(`   Status Code: ${res.statusCode}`);
    console.log(`   Duration:    ${duration} ms`);
    console.log('='.repeat(80) + '\n');

    return originalSend(body);
  };

  next();
};
