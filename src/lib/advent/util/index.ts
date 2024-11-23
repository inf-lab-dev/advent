import { Tasks } from '..';

/**
 * Gets all navigation entries for the tasks.
 *
 * @param tasks the tasks to get the navigation for
 * @returns the navigation entries, sorted in the correct order.
 */
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
                    ...(files.epilogue ? [`/advent/${slug}/epilogue`] : []),
                ],
            }),
        );
}
