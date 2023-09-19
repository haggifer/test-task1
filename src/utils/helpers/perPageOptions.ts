import { ISelectOption } from "../../typescript/common";

export const generatePerPageOptions = (values: number[]): ISelectOption<number>[] => {
  return values.map(value => ({
    label: String(value),
    value,
  }))
}