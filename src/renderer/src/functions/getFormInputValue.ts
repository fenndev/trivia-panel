export default function getFormInputValue(form: HTMLFormElement, inputName: string): string {
    return (form.elements.namedItem(inputName) as HTMLInputElement).value;
}
