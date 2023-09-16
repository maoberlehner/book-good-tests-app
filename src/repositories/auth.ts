export const makeAuthRepository = ({ apiBaseUrl = '/api/' } = {}) => ({
  logIn({
    name,
    password,
  }: {
    name: string;
    password: string;
  }): Promise<{ token: string; user: { id: string; name: string } }> {
    return fetch(`${apiBaseUrl}login`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
  },
});
