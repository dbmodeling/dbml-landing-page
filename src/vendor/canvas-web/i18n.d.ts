export type Language = 'pt-BR' | 'en';
export declare const translations: ReadonlyArray<readonly [string, string]>;
export declare function systemLanguage(value: string): Language;
export declare function setLanguage(value: Language): void;
export declare function t(key: string, ...values: (string | number)[]): string;
/** Igual a `t`, mas num idioma explícito (sem mexer no idioma global). */
export declare function tFor(lang: Language, key: string, ...values: (string | number)[]): string;
/** Localiza mensagens conhecidas do lint preservando os identificadores DBML. */
export declare function diagnosticMessage(message: string): string;
export declare function isTlsCertError(message: string): boolean;
export declare function connectionHint(message: string, sqlite: boolean): string;
