// import React, { useState } from "react";
// import analyzeText from "./morphAnalyzer";

// function Analyze() {
//   const [text, setText] = useState("");
//   const [results, setResults] = useState([]);

//   const handleAnalyze = async () => {
//     try {
//       const analysisResults = await analyzeText(text);
//       setResults(analysisResults);
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div className="App">
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="일본어 텍스트를 입력하세요"
//       />
//       <button onClick={handleAnalyze}>분석</button>
//       <div id="results">
//         {results.map((result, index) => (
//           <span key={index}>
//             기본형: {result.basic_form}
//             <br />
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Analyze;
