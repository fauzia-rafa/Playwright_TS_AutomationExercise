import { test, expect, request } from '@playwright/test';
import { buildUser } from '../src/utils/data';         
import { createAccount } from '../src/utils/apiClient';

async function messageOf(res: any) {
  const body = await res.json().catch(async () => (await res.text()));
  return (body?.message ?? body)?.toString();
}


test.describe('Task 2: API Automation - createAccount', () => {
  test('register a new user (200/201) then duplicate (400 or 200 with message)', async () => {
    const api = await request.newContext();
    try {
      const user = buildUser(); 

      // Create new user
      const res1 = await createAccount(api, user);
      expect([200, 201]).toContain(res1.status());
      const msg1 = (await messageOf(res1)).toLowerCase();
      expect(msg1).toMatch(/user created/i);

      // Attempt duplicate
      const res2 = await createAccount(api, user);
      expect([400, 200]).toContain(res2.status());
      const msg2 = (await messageOf(res2)).toLowerCase();
      expect(msg2).toMatch(/already exist/);
    } finally {
      await api.dispose(); 
    }
  });
});
