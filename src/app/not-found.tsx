import ErrorPage from '@/components/layout/error';

export default function NotFound() {
    return (
        <ErrorPage
            code="404"
            icon="cane"
            text="Die angeforderte Seite konnte leider nicht gefunden werden."
        />
    );
}
