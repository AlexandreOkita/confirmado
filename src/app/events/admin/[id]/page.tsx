"use client"

import { getEventBySharebleLink } from "@/lib/repository/events.repository";
import { useEffect } from "react";
import { AnswersChart } from "./components/answers_chart"
import { AnswersTable } from "./components/answers_table";
import { useState } from "react";
import AdminController from "./admin_controller";
import { Answer } from "@/lib/data/confirmado.database";

export default function Admin({ params }: { params: { id: string } }) {
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [chartData, setChartData] = useState<{ answer_date: string, total_answers: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setAnswers(await AdminController.fetchAnswers(params.id));
            setChartData(await AdminController.fetchAnswersGroupedByDate(params.id));
            setLoading(false);
        };

        fetchData();
    }, []);


    document.documentElement.classList.add('dark');
    console.log("chart", chartData);
    console.log("answers", answers);

    return (
        <div>
            {AnswersChart(chartData)}
            {AnswersTable(answers)}
        </div>
    )
}
