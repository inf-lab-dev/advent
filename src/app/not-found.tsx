import ErrorPage from '@/components/layout/error';

export default function NotFound() {
    return (
        <ErrorPage
            icon="cane"
            code={404}
            text="Die angeforderte Seite konnte leider nicht gefunden werden."
        />
    );
}
