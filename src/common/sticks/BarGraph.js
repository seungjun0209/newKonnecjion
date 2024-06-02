import React, { useState, useEffect } from "react";
import kuromoji from "kuromoji";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./BarGraph.css";

//npm install recharts

// CustomTooltip 컴포넌트 생성
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="label">{`${payload[0].value}%`}</div>
      </div>
    );
  }

  return null;
};

export default function BarGraph(props) {
  const [posPercentages, setPosPercentages] = useState([
    { pos: "名詞", percentage: 0 },
    { pos: "動詞", percentage: 0 },
    { pos: "形容詞", percentage: 0 },
    { pos: "助詞", percentage: 0 },
    { pos: "助動詞", percentage: 0 },
  ]);

  useEffect(() => {
    const analyzeTokens = (tokens) => {
      const counts = {
        名詞: 0,
        動詞: 0,
        形容詞: 0,
        助詞: 0,
        助動詞: 0,
      };

      tokens.forEach((token) => {
        if (counts.hasOwnProperty(token.pos)) {
          counts[token.pos]++;
        }
      });

      const total = tokens.length;

      const percentages = Object.entries(counts).map(([pos, count]) => ({
        pos,
        percentage: ((count / total) * 100).toFixed(0),
      }));

      setPosPercentages(percentages);
    };

    if (props.analyzeSentence) {
      kuromoji
        .builder({ dicPath: process.env.PUBLIC_URL + "/kuromoji-dict/" })
        .build((err, tokenizer) => {
          if (err) {
            console.error(err);
          } else {
            const tokens = tokenizer.tokenize(props.analyzeSentence);
            analyzeTokens(tokens);
          }
        });
    }
  }, [props.analyzeSentence]);

  return (
    <div className="bar-graph">
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          className="bar-chart"
          data={posPercentages}
          margin={{ top: 5, right: 40, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="pos" />
          <YAxis ticks={[0, 30, 60, 90]} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="percentage" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
