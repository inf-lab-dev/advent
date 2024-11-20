import { Tasks } from '..';

export function getNavigationEntries(tasks: Tasks) {
    return Array.from(tasks.values())
        .toSorted(
            (a, b) =>
                b.manifest.navigation.weight - a.manifest.navigation.weight,
        )
        .map(
            ({
                slug,
                manifest: {
                    navigation: { title },
                    files,
                },
            }) => ({
                href: `/advent/${slug}`,
                label: title,
                children: [
                    `/advent/${slug}`,
                    ...(files.solution ? [`/advent/${slug}/solution`] : []),
                ],
            }),
        );
}
