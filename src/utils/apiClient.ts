
import { APIRequestContext, expect } from '@playwright/test';
import { User } from './data';
import data from "../data/user_credentials.json";

type FormPrimitive = string | number | boolean;

function toForm(obj: Record<string, unknown>): Record<string, FormPrimitive> {
  const out: Record<string, FormPrimitive> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) {
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        out[k] = v;
      } else {
        out[k] = String(v);
      }
    }
  }
  return out;
}

export async function createAccount(request: APIRequestContext, user: User) {
  const form = toForm({
    name: user.name,
    email: user.email,
    password: user.password,
    title: user.title,
    birth_date: user.birth_date,
    birth_month: user.birth_month,
    birth_year: user.birth_year,
    firstname: user.firstname,
    lastname: user.lastname,
    company: user.company,
    address1: user.address1,
    address2: user.address2,
    country: user.country,
    zipcode: user.zipcode,
    state: user.state,
    city: user.city,
    mobile_number: user.mobile_number,
  });

  return request.post('https://automationexercise.com/api/createAccount', { form });
}

export async function expectCreateUser201(response: any) {
  expect(response.status(), 'status should be 201').toBe(201);
  const body = await response.json().catch(async () => (await response.text()));
  const message = (body?.message ?? body)?.toString() ?? '';
  expect.soft(message).toContain('User created');
  return message;
}