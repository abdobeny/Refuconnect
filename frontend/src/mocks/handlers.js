import { rest } from 'msw';
import mockAnimals from '../data/mockAnimals';

export const handlers = [
  // Return animals list
  rest.get('/api/animals', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAnimals));
  }),

  // Return a created adoption
  rest.post('/api/adoptions', async (req, res, ctx) => {
    let body = req.body;
    // msw may provide parsed body or require parsing depending on setup
    if (!body || Object.keys(body).length === 0) {
      try {
        body = await req.json();
      } catch (e) {
        body = {};
      }
    }

    const created = { id: Date.now().toString(), ...body };
    return res(ctx.status(201), ctx.json(created));
  }),
];
