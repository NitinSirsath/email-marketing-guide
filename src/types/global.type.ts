import React from "react";

export type BooleanSetStateAction = React.Dispatch<
  React.SetStateAction<boolean>
>;

export type BooleanStateAction = boolean;

export type ChangeEventForInput = React.ChangeEvent<HTMLInputElement>;

export type ChildrenPropType = React.ReactNode;

export type SelectEventAutoComplete = React.SyntheticEvent<Element, Event>;

export interface RecordDataType {
  id: number;
  label: string;
}
