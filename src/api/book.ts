interface Word {
  word: string;
  meaning: string;
}

interface CreateBookRequest {
  userId: string;
  bookName: string;
  words: Word[];
}

interface CreateBookResponse {
  bookId: string;
}

export const createBook = async (
  token: string,
  userId: string,
  bookName: string,
  words: Word[]
): Promise<CreateBookResponse> => {
  const response = await fetch('http://localhost:8080/api/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Token': token,
    },
    body: JSON.stringify({
      userId,
      bookName,
      words,
    } as CreateBookRequest),
  });

  if (!response.ok) {
    throw new Error('単語帳の作成に失敗しました');
  }

  return response.json();
};
