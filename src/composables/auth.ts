import { readonly, ref } from 'vue';
import { useRouter } from 'vue-router';

import { makeAuthRepository } from '../repositories/auth';

const auth = makeAuthRepository({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
});

export const useAuth = () => {
  const userRaw = localStorage.getItem('user');
  const user = ref(userRaw ? JSON.parse(userRaw) : null);
  const router = useRouter();

  return {
    user: readonly(user),
    logIn: async ({ name, password, redirectUrl = '/' }) => {
      const { token, user: newUser } = await auth.logIn({ name, password });

      if (!newUser || !token) {
        alert('Invalid credentials');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      user.value = newUser;

      if (redirectUrl) await router.push(redirectUrl);
    },
  };
};
