export default function getFormFileInput(form: HTMLFormElement, inputName: string): File {
    return (form.elements.namedItem(inputName) as HTMLInputElement).files[0];
}
