'use client';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Title,
    Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Title,
    Legend
);


type BarchartProps = {
    inputResult: string
};

export function Doughnutchart({ inputResult }: BarchartProps) {
    const [optionData, setOptionData] = useState<number[]>([0, 0]);

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

                // optionDataを更新
                if (data.length > 0) {
                    setOptionData([
                        data[0]["count_attend"],
                        data[0]["count_reviews"] - data[0]["count_attend"]
                    ]);
                }

                console.log('Fetched reviews:', data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchReviewData();
        console.log('Input result:', inputResult);
    }, [inputResult]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: "投稿数",
            }
        }
    };

    const labels = ["出席あり", "出席なし"];

    const data = {
        labels, // x軸のラベルの配列
        datasets: [
            {
                label: "投稿数", // 凡例
                data: optionData, // 状態として管理されたデータ
                backgroundColor: ["orangered", "limegreen"] // グラフの棒の色
            }
        ]
    };

    return (
        <>
            <Doughnut options={options} data={data} />
        </>
    );
}
