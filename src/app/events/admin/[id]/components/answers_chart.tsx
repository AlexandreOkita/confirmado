"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
    { date: "2024-06-12", answers: 492 },
    { date: "2024-06-13", answers: 81 },
    { date: "2024-06-14", answers: 426 },
    { date: "2024-06-15", answers: 307 },
    { date: "2024-06-16", answers: 371 },
    { date: "2024-06-17", answers: 475 },
    { date: "2024-06-18", answers: 107 },
    { date: "2024-06-19", answers: 341 },
    { date: "2024-06-20", answers: 408 },
    { date: "2024-06-21", answers: 169 },
    { date: "2024-06-22", answers: 317 },
    { date: "2024-06-23", answers: 480 },
    { date: "2024-06-24", answers: 132 },
    { date: "2024-06-25", answers: 141 },
    { date: "2024-06-26", answers: 434 },
    { date: "2024-06-27", answers: 448 },
    { date: "2024-06-28", answers: 149 },
    { date: "2024-06-29", answers: 103 },
    { date: "2024-06-30", answers: 446 },
]

const chartConfig = {
    views: {
        label: "Confirmações",
    },
    total_answers: {
        label: "Confirmações",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function AnswersChart(chartData: { answer_date: string, total_answers: number }[]) {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("total_answers")

    const total = React.useMemo(
        () => ({
            total_answers: chartData.reduce((acc, curr) => acc + curr.total_answers, 0),
        }),
        []
    )

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Confirmações do seu evento</CardTitle>
                    <CardDescription>
                        Mostrando o total de confirmações por dia
                    </CardDescription>
                </div>
                <div className="flex">
                    {["total_answers"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {chartData.reduce((acc, curr) => acc + curr.total_answers, 0)}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="answer_date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px] bg-slate-950"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("pt-BR", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
