
export type User = {
  name: string;
  email: string;
  password: string;
  title?: string;
  birth_date?: string;
  birth_month?: string;
  birth_year?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  mobile_number?: string;
};

// export function uniqueEmail(prefix = 'fauzia_sqa'): string {
//   const ts = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0,14);
//   return `${prefix}+${ts}@example.com`;
// }

export function buildUser(overrides: Partial<User> = {}): User {
  const email = overrides.email ?? 'fauzia_test@example.com';
  const password = overrides.password ?? 'P@ssw0rd!23';
  return {
    name: overrides.name ?? 'QA Candidate',
    email,
    password,
    title: 'Miss',
    birth_date: '10',
    birth_month: '10',
    birth_year: '1990',
    firstname: 'QA',
    lastname: 'Candidate',
    company: 'Kinetik',
    address1: '123 Test St',
    address2: 'Suite 456',
    country: 'United States',
    zipcode: '10001',
    state: 'NY',
    city: 'New York',
    mobile_number: '+11234567890',
    ...overrides
  };
}
