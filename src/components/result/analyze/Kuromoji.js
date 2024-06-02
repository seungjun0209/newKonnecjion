import { useState, useEffect } from "react";
import kuromoji from "kuromoji";

function Kuromoji({ text, onTokensChange }) {
  const [tokenizer, setTokenizer] = useState(null);

  useEffect(() => {
    // アプリのマウント時にkuromojiトークナイザを初期化
    kuromoji
      .builder({ dicPath: process.env.PUBLIC_URL + "/kuromoji-dict/" })
      .build(function (err, buildTokenizer) {
        // dicPathで辞書のディレクトリを指定
        if (err) {
          console.error(err);
        } else {
          setTokenizer(buildTokenizer);
        }
      });
  }, []);

  useEffect(() => {
    // textが変更されるたびにトークナイズ
    if (tokenizer && text) {
      const path = tokenizer.tokenize(text);
      onTokensChange(path); // トークナイズ結果を親コンポーネントに渡す
    }
  }, [tokenizer, text, onTokensChange]);

  return null; // UIをレンダリングしない
}

export default Kuromoji;
