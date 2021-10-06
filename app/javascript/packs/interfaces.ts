export interface KeyResultInterface {
  id?: number;
  title: string | null;
}

export interface ObjectiveInterface {
  id?: number;
  title: string | null;
  key_results: KeyResultInterface[];
}