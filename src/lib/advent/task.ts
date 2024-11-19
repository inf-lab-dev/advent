import { Advent, AdventSunday, fromLiteral } from '.';

export interface Task {
    sunday: AdventSunday;
    title: string;
    content: string;
}

export class Tasks {
    private map = new Map<AdventSunday, Task>();

    public constructor(tasks: Task[]) {
        tasks.forEach((task) => this.map.set(task.sunday, task));
    }

    public get sundays(): AdventSunday[] {
        return Array.from(this.map.keys());
    }

    public get tasks(): Task[] {
        return Array.from(this.map.values());
    }

    public get(sundayOrLiteral: AdventSunday | Advent): Task | null {
        if (typeof sundayOrLiteral === 'string') {
            const sunday = fromLiteral(sundayOrLiteral);

            if (sunday === null) {
                throw new TypeError(
                    `Cannot convert "${sundayOrLiteral}" back into an advent-sunday.`,
                );
            }

            sundayOrLiteral = sunday;
        }

        return this.map.get(sundayOrLiteral) ?? null;
    }

    public get [Symbol.iterator]() {
        return this.map.entries();
    }
}
