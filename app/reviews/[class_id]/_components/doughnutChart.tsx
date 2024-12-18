'use client';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Chart,
    Tooltip,
    Title,
    Legend,
    ChartOptions
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Title,
    Legend
);

type BarchartProps = {
    inputResult: string;
};

export function Doughnutchart({ inputResult }: BarchartProps) {
    const [optionData, setOptionData] = useState<number[]>([0, 0]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // データ取得完了フラグ

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                let response;
                if (inputResult === "") {
                    response = await fetch('/api-db');
                } else {
                    response = await fetch(`/api-db/search-review?id=${inputResult}`);
                }
                const data = await response.json();

                if (data.length > 0) {
                    setOptionData([
                        data[0]["count_reviews"] - data[0]["count_attend"],
                        data[0]["count_attend"]
                    ]);
                }
                setIsDataLoaded(true); // データ取得完了フラグをtrueに設定
                console.log('Fetched reviews:', data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setIsDataLoaded(true); // エラー時もフラグを更新
            }
        };

        fetchReviewData();
        console.log('Input result:', inputResult);
    }, [inputResult]);

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
                reverse: true
            },
            title: {
                display: true,
                text: "出席なしと投稿された割合",
                padding: 0,
                font: {
                    size: 20
                }
            }
        }
    };

    const labels = ["出席なし", "出席あり"];

    const data = {
        labels,
        datasets: [
            {
                label: "投稿数",
                data: optionData,
                backgroundColor: ["limegreen", "orangered"]
            }
        ]
    };

    const centerTextPlugin = {
        id: 'centerText',
        afterDraw: (chart: Chart) => { // 型をChartに変更
            const { ctx, chartArea } = chart;
            if (!chartArea) return; // chartAreaが未定義の場合をガード
    
            const { top, left, right, bottom } = chartArea;
    
            const centerX = (left + right) / 2;
            const centerY = (top + bottom) / 2;
    
            ctx.save();
            ctx.font = '30px sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillStyle = "#000";
    
            const total = optionData[0] + optionData[1];
            let percentageText = "データなし";
    
            if (total > 0) {
                const percentage = (optionData[0] / total) * 100;
                percentageText = `${percentage.toFixed(1)}%`; // 小数点1桁でフォーマット
            }
    
            ctx.fillText(percentageText, centerX, centerY); // 中央にテキストを描画
            ctx.restore();
        }
    };

    return (
        <>
            {!isDataLoaded ? (
            <div>
            </div>
            ) : (
                <Doughnut
                    options={options}
                    data={data}
                    plugins={[centerTextPlugin]}
                />
            )}
        </>
    );
}
