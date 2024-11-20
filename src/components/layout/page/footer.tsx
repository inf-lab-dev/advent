import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer>
            <hr className="mx-auto w-11/12" />

            <section className="container mx-auto px-6 py-12 text-center">
                <h3 className="flex justify-center gap-2">
                    Made with <Heart className="text-red-700" />
                    by
                    <a
                        className="hover:underline"
                        href="https://inf-lab.dev"
                        rel="noopener noreferer"
                        target="_blank"
                    >
                        inf-lab.dev
                    </a>
                </h3>
            </section>
        </footer>
    );
}
