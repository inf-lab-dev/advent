import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';

export interface Props {
    onKeyLoaded: (key: string) => void;
}

const loadFile = (file: Blob) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);

        reader.readAsText(file, 'utf8');
    });

export default function FileInput({ onKeyLoaded }: Props) {
    'use client';

    const [isLoading, setLoading] = useState(false);
    const [loadedOnce, setLoadedOnce] = useState(false);

    const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];

        setLoading(true);
        loadFile(file).then((key) => {
            onKeyLoaded(key);

            setLoadedOnce(true);
            setLoading(false);
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Privaten Schlüssel auswählen</CardTitle>
                <CardDescription>
                    Wähle hier die <em>pem-Datei</em> des privaten Schlüssel
                    aus. Beachte bitte, dass keine Validierung dieses Schlüssels
                    erfolgt und daher ein fehlerhafter Schlüssel zu Fehlern
                    führen wird.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Input
                    accept=".pem"
                    className="h-full"
                    disabled={isLoading}
                    type="file"
                    onChange={onFileSelected}
                />
            </CardContent>
            {!loadedOnce && (
                <CardFooter className="text-sm text-muted-foreground">
                    Sobald eine Datei gewählt wurde, sind auch die weiteren
                    Panels sichtbar.
                </CardFooter>
            )}
        </Card>
    );
}
