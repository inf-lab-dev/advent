import { notFound } from 'next/navigation';

export interface Props {
    params: Promise<{
        task: string;
    }>;
}

export async function generateStaticParams() {
    return [
        {
            task: 'test',
        },
    ];
}

export default async function TaskDescription({ params }: Props) {
    const { task } = await params;

    if (task !== 'test') {
        return notFound();
    }

    return (
        <div>
            <p>Task description page</p>
            <p>You have requested {task}!</p>
        </div>
    );
}
