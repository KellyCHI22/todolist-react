import axios from 'axios';
const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    const { authToken } = data;
    console.log(data);

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

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });

    const { authToken } = data;
    console.log(data);

    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`, {
      headers: {
        // 注意字串 'Bearer ' 需要手動保留一個空格
        Authorization: 'Bearer ' + authToken,
      },
    });
    // 後端會提供 success 屬性來告知 true/false
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
