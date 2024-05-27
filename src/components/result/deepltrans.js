import axios from "axios";

export async function translateText(text, targetLang) {
  const apiKey = process.env.REACT_APP_DEEPL_API_KEY;
  console.log("API Key:", apiKey); // 환경 변수가 제대로 설정되었는지 확인

  if (!apiKey) {
    throw new Error("API Key is not defined");
  }

  const url = "https://api-free.deepl.com/v2/translate";

  const params = new URLSearchParams();
  params.append("auth_key", apiKey);
  params.append("text", text);
  params.append("target_lang", targetLang);

  try {
    const response = await axios.post(url, params);
    return response.data.translations[0].text;
  } catch (error) {
    throw new Error("Translation failed: " + error.message);
  }
}
