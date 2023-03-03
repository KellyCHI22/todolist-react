import axios from 'axios';
const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    const { authToken } = data;

    // 若 authToken 存在就代表登入成功，就回傳資料以便後續利用。
    // 在回傳資料時，一併整理資料格式，加上 success 屬性做為 flag，
    // 之後就能用 success 屬性來判斷是否登入成功。
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};
