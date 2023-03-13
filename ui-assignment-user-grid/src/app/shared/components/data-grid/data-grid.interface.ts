export enum SortDirection {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

export interface IHeaderColumn {
  title: string;
  key: string;
  sortable?: boolean;
  sortDirection?: SortDirection;
}

export type Row<T> = T & { selected?: boolean };

export interface IDataSource<T> {
  headers: IHeaderColumn[];
  data: Row<T>[];
}
