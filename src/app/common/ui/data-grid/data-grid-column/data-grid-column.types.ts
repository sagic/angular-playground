// consider adding an optional task to use generics as ColumnDef<T> and set an optional value formatting function  ;)
export interface ColumnDef {
  id: string;
  label: string;
  sortable?: boolean;
  width?: number | string;
  valueFormatter?: (value: any) => string;
}
