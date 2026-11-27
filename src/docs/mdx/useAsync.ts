import * as React from "react";

/** Resultado de uma carga assíncrona simples (JSON gerado, changelog). */
export function useAsync<T>(load: () => Promise<T | null>): { data: T | null; done: boolean } {
  const [state, setState] = React.useState<{ data: T | null; done: boolean }>({ data: null, done: false });
  React.useEffect(() => {
    let alive = true;
    load().then(
      (data) => alive && setState({ data, done: true }),
      () => alive && setState({ data: null, done: true }),
    );
    return () => {
      alive = false;
    };
    // `load` é sempre uma função de módulo estável
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state;
}
