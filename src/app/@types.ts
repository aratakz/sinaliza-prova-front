export type TableColumn =  {
  index: string;
  title?: string;
  align?: string;
}

export type TableLine = {
  index: string;
  fields: Array<TableData>;
}
export type TableData = {
  index: any;
  value?: string|number;
  buttons?: TableActionButton[]
  classes?: string[]
}

export type TableActionButton = {
  index: string;
  icon?: string;
  type?: string;
  text?: string;
  classes: string[];
  onClick: Function
}
