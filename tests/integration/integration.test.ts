import request from 'supertest';
import { createLeaseInput } from '../unit/domain/createSchedule.test';
import { spawn, ChildProcess } from 'child_process';

const baseUrl = 'http://localhost:7071';

let funcProcess: ChildProcess;

jest.setTimeout(60000);

beforeAll(async () => {
  funcProcess = spawn('func', ['start'], { stdio: 'inherit' });

  await new Promise((resolve) => setTimeout(resolve, 20000));
}, 60000);

afterAll((done) => {
  if (funcProcess) {
    funcProcess.on('exit', () => done());
    funcProcess.kill('SIGKILL');
  } else {
    done();
  }
});

describe('Create lease', () => {
  it('should create a new lease successfully', async () => {
    const body = createLeaseInput();
    const response = await request(baseUrl)
      .post('/api/leases')
      .set('x-api-key', process.env.API_KEY || 'local-dev-key')
      .send({
        ...body,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Invalid Api key, should return Unauthorized', async () => {
    const body = createLeaseInput();
    const response = await request(baseUrl)
      .post('/api/leases')
      .set('x-api-key', 'wrong-key')
      .send({
        ...body,
      });

    expect(response.status).toBe(401);
  });
});

describe('Record Payment', () => {
  it('should record a new payment successfully', async () => {
    const input = createLeaseInput();
    input.termMonths = 1;

    const leaseResponse = await request(baseUrl)
      .post('/api/leases')
      .set('x-api-key', process.env.TEST_API_KEY || 'local-dev-key')
      .send({
        ...input,
      });

    const leaseId = leaseResponse.body.id;
    const body = {
      id: "",
      leaseId: leaseId,
      paidAt: new Date().toISOString(),
      amount: leaseResponse.body.schedule[0].payment
    };

    const response = await request(baseUrl)
      .post('/api/payments')
      .set('x-api-key', process.env.API_KEY || 'local-dev-key')
      .send({
        ...body,
      });

    expect(response.status).toBe(200);
  });
});
