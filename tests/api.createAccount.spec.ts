import { test, expect, request } from '@playwright/test';
import { buildUser } from '../src/utils/data';
import { createAccount } from '../src/utils/apiClient';
import data from "../src/data/user_credentials.json";

async function messageOf(res: any) {
  const body = await res.json().catch(async () => (await res.text()));
  return (body?.message ?? body)?.toString();
}

test.describe('Task 2: API Automation - createAccount', () => {
  test('register a new user (200/201) then duplicate (400 or 200 with message)', async () => {
    const api = await request.newContext();
    const user = buildUser({email:data.email, password:data.password});

    // Create new user
    const res1 = await createAccount(api, user);
    expect([200, 201]).toContain(res1.status()); // tolerate 200 or 201
    const msg1 = (await messageOf(res1)).toLowerCase();
    expect(msg1).toMatch(/user created/i);

    // Attempt duplicate
    const res2 = await createAccount(api, user);
    expect([400, 200]).toContain(res2.status()); // some envs wrongly return 200
    const msg2 = (await messageOf(res2)).toLowerCase();
    expect(msg2).toMatch(/already exist/);
  });
});
