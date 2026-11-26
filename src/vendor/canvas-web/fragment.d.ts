/**
 * Codificação do fragmento `#dbml=<deflate-raw + base64url>` usado pelo "Abrir no editor" da
 * documentação. Só APIs nativas do navegador (`CompressionStream`/`DecompressionStream`);
 * `new Response(bytes).body` em vez de `Blob.stream()` porque o jsdom dos testes não tem este.
 * Sem dependências do workbench: o site da documentação importa isto do bundle de leitura.
 */
/** Fragmento presente, mas ilegível (base64, deflate, UTF-8 ou tamanho). */
export declare class FragmentError extends Error {
    constructor(message: string);
}
/** `#dbml=<payload>` pronto para anexar à URL do editor (ex.: `http://127.0.0.1:3000/` + isto). */
export declare function encodeDbmlFragment(dbml: string): Promise<string>;
/**
 * Lê o DBML de um fragmento (`location.hash`, com ou sem `#`). Devolve `null` se não houver
 * `dbml=`; lança `FragmentError` se houver, mas não for decodificável.
 */
export declare function decodeDbmlFragment(hash: string): Promise<string | null>;
