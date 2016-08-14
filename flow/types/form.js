type FormField = {
  model: string,
  label: string,
  style: ?Object,
}

export type TextFieldProps = FormField & {
  type: string,
  prefix: ?string,
  suffix: ?string,
  placeholder: ?string,
}

export type TextAreaProps = FormField & {
  placeholder: ?string,
}

export type RadioGroupProps = FormField & {
  options: Array<{id: string, label: string}>,
}

export type AttachmentProps = FormField & {
  rootModel: string,
  accept: ?string,
  multiple: ?boolean,
}
