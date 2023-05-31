export default function handleError(error: unknown): void {
    if (error instanceof Error) {
        console.error(`Error: ${error.name}, ${error.message}`);
        console.error(`Stack Trace: ${error.stack}`);
    } else console.error(`Unexpected error caught.`);
}
