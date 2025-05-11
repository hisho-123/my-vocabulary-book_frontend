interface RegisterResponse {
  userId: string;
  token: string;
}

interface LoginResponse {
  userId: string;
  token: string;
}

export const register = async (userName: string, password: string): Promise<RegisterResponse> => {
  const response = await fetch('http://localhost:8080/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export const login = async (userName: string, password: string): Promise<LoginResponse> => {
  const response = await fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const deleteUser = async (token: string): Promise<void> => {
  const response = await fetch('http://localhost:8080/api/user-delete', {
    method: 'DELETE',
    headers: {
      'Token': token,
    },
  });

  if (!response.ok) {
    throw new Error('User deletion failed');
  }
};
