'use client';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Review {
    id: number;
    class_id: string;
    comment: string;
    attend: number;
    option1: number;
    option2: number;
    option3: number;
    option4: number;
    option5: number;
    created_at: string;
    user_id: number;
    class_name: string;
    count_option1: number;
    count_option2: number;
    count_option3: number;
    count_option4: number;
    count_option5: number;
    count_attend: number;
    count_reviews: number;
}

type BarchartProps = {
    inputResult: string
};

export function Barchart({ inputResult }: BarchartProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [optionData, setOptionData] = useState<number[]>([0, 0, 0, 0, 0]);

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
                setReviews(data);

                // optionDataを更新
                if (data.length > 0) {
                    setOptionData([
                        data[0]["count_option1"],
                        data[0]["count_option2"],
                        data[0]["count_option3"],
                        data[0]["count_option4"],
                        data[0]["count_option5"],
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
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "この授業につけられたタグ"
            }
        }
    };

    const labels = ["responあり", "点呼あり", "小テスト(対面)あり", "小テスト(manaba)あり", "穴埋めの授業資料"];

    const data = {
        labels, // x軸のラベルの配列
        datasets: [
            {
                label: "投稿数", // 凡例
                data: optionData, // 状態として管理されたデータ
                backgroundColor: "royalblue" // グラフの棒の色
            }
        ]
    };

    return (
        <>
            <Bar options={options} data={data} />
        </>
    );
}
