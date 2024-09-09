"use client"

import { AnswersChart } from "./components/answers_chart"
import { AnswersTable } from "./components/answers_table";

export default function Admin() {
    document.documentElement.classList.add('dark');
    return (
        <div>
            {AnswersChart()}
            {AnswersTable()}
        </div>
    )
}
