import React, { useState, useEffect, useCallback } from "react";
import Kuromoji from "./Kuromoji";

const AnalyzeKuromoji = (props) => {
  const [tokenDetails, setTokenDetails] = useState([]);

  const handleTokensChange = useCallback((newTokens) => {
    const extractedDetails = newTokens.map((token) => ({
      surface_form: token.surface_form,
      pos: token.pos,
      basic_form: token.basic_form,
    }));
    setTokenDetails(extractedDetails);
  }, []);

  useEffect(() => {
    if (tokenDetails.length > 0) {
      console.log("Token Details:", tokenDetails);
      // 추가 작업을 여기에 추가할 수 있습니다.
    }
  }, [tokenDetails]);

  return (
    <div>
      <Kuromoji
        text={props.analyzeSentence}
        onTokensChange={handleTokensChange}
      />
    </div>
  );
};

export default AnalyzeKuromoji;
