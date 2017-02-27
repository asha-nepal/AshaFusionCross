type FormField = {
  field: string,
  model: string,
  class: string,
  label?: string,
  style?: Object,
  children?: Array<FormField>,
  show?: boolean | string,
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

export type CheckboxProps = FormField;
