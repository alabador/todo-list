import { initForm } from "./initializeForm";

export function openForm() {
    const body = document.querySelector('body');
    body.append(initForm());
}