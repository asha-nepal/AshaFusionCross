type FormField = {
  model: string,
  label: string,
  style: ?Object,
}

export type TextFieldProps = FormField & {
  type: string,
}

export type TextAreaProps = FormField

export type RadioGroupProps = FormField & {
  options: Array<{id: string, label: string}>,
}
