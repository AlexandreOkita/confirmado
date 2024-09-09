import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const answers = [
    {
        id: "001",
        name: "Alexandre Okita",
        email: "xande.okita@gmail.com",
        date: "2024-09-08",
    },
    {
        id: "002",
        name: "John Doe",
        email: "johndoe@example.com",
        date: "2024-09-09",
    },
    {
        id: "003",
        name: "Jane Smith",
        email: "janesmith@example.com",
        date: "2024-09-10",
    },
    {
        id: "004",
        name: "Michael Johnson",
        email: "michaeljohnson@example.com",
        date: "2024-09-11",
    },
    {
        id: "005",
        name: "Emily Davis",
        email: "emilydavis@example.com",
        date: "2024-09-12",
    },
    {
        id: "006",
        name: "David Wilson",
        email: "davidwilson@example.com",
        date: "2024-09-13",
    },
    {
        id: "007",
        name: "Sarah Thompson",
        email: "sarahthompson@example.com",
        date: "2024-09-14",
    },
    {
        id: "008",
        name: "Christopher Martinez",
        email: "christophermartinez@example.com",
        date: "2024-09-15",
    }
]

export function AnswersTable() {
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
                {answers.map((answer) => (
                    <TableRow key={answer.id}>
                        <TableCell className="font-medium">{answer.id}</TableCell>
                        <TableCell className="font-medium">{answer.name}</TableCell>
                        <TableCell>{answer.email}</TableCell>
                        <TableCell>{answer.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
