export type TodosBit = {
  todos: {
    text: string;
    done: boolean;
  }[];
};

export type TodoActions =
  | {
      type: 'todos.add';
      text: string;
    }
  | {
      type: 'todos.toggle';
      index: number;
    }
  | {
      type: 'todos.remove';
      index: number;
    };
