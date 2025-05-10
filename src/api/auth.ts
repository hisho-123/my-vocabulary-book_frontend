interface RegisterResponse {
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
