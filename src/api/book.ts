interface Word {
  id: number;
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

interface GetBookResponse {
  bookName: string;
  words: {
    word: string;
    translated: string;
  }[];
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

export const getBook = async (token: string, bookId: string): Promise<GetBookResponse> => {
  const response = await fetch(`http://localhost:8080/api/book?bookId=${bookId}`, {
    method: 'GET',
    headers: {
      'Token': token,
    },
  });

  if (!response.ok) {
    throw new Error('単語帳の取得に失敗しました');
  }

  return response.json();
};
