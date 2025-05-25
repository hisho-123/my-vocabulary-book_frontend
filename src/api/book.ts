interface Word {
  word: string;
  translated: string;
}

interface CreateBookRequest {
  userId: number;
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

interface BookListItem {
  bookId: string;
  bookName: string;
}

export const createBook = async (
  token: string,
  userId: number,
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

export const getBookList = async (token: string): Promise<BookListItem[]> => {
  const response = await fetch('http://localhost:8080/api/book-list', {
    method: 'GET',
    headers: {
      'Token': token,
    },
  });

  if (!response.ok) {
    throw new Error('単語帳一覧の取得に失敗しました');
  }

  return response.json();
};

export const deleteBook = async (token: string, bookId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/book-delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Token': token,
    },
    body: JSON.stringify({ bookId }),
  });

  if (!response.ok) {
    throw new Error('単語帳の削除に失敗しました');
  }
};
