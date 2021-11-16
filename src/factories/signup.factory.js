import faker from 'faker';

export default function createSignUpBody() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);
  const password = faker.internet.password();

  return {
    name: `${firstName} ${lastName}`,
    email,
    password,
  };
}
