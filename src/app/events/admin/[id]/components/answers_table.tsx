import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Answer } from "@/lib/data/confirmado.database"

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function AnswersTable(answers: Answer[]) {
    return (
        <Table className="border px-4">
            <TableCaption>Lista das últimas confirmações.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Confirmação</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {answers.map((answer, index) => (
                    <TableRow key={answer.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{answer.name}</TableCell>
                        <TableCell>{answer.email}</TableCell>
                        <TableCell>{formatDate(answer.created_at)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
