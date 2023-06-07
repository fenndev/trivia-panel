export default function getFormInputValue(form: HTMLFormElement, inputName: string): string {
    return (form.elements.namedItem(inputName) as HTMLInputElement).value;
}

export function getFormSelectValue(form: HTMLFormElement, inputName): string {
    return (form.elements.namedItem(inputName) as HTMLSelectElement).selectedOptions[0].value;
}
