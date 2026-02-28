import { apiClient } from './config';

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
  try {
    return await apiClient.post('/book', {
      userId,
      bookName,
      words,
    } as CreateBookRequest, token);
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      throw new Error("不正な入力があります");
    }
    throw new Error('単語帳の作成に失敗しました');
  }
};

export const getBook = async (token: string, bookId: string): Promise<GetBookResponse> => {
  try {
    return await apiClient.get(`/book?bookId=${bookId}`, token);
  } catch (error) {
    throw new Error('単語帳の取得に失敗しました');
  }
};

export const getBookList = async (token: string): Promise<BookListItem[]> => {
  try {
    return await apiClient.get('/book-list', token);
  } catch (error) {
    throw new Error('単語帳一覧の取得に失敗しました');
  }
};

export const deleteBook = async (token: string, bookId: number): Promise<void> => {
  try {
    await apiClient.delete('/book-delete', { bookId }, token);
  } catch (error) {
    throw new Error('単語帳の削除に失敗しました');
  }
};
