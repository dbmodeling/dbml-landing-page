import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OPERATING_SYSTEMS, type OperatingSystem } from "../constants";
import { useDocs } from "../context";

interface AbaProps {
  titulo: string;
  so?: OperatingSystem;
  children?: React.ReactNode;
}

/** Aba genérica: só descreve os dados; quem renderiza é `<Abas>`. */
export function Aba(_props: AbaProps) {
  return null;
}

const isAba = (node: React.ReactNode): node is React.ReactElement<AbaProps> =>
  React.isValidElement(node) && typeof (node.props as Partial<AbaProps>).titulo === "string";

/** Conjunto de abas; com `detectarSo` abre na aba cujo `so` é o do leitor. */
export function Abas({ detectarSo = false, children }: { detectarSo?: boolean; children?: React.ReactNode }) {
  const { os } = useDocs();
  const tabs = React.Children.toArray(children).filter(isAba);
  const detected = detectarSo ? tabs.find((tab) => tab.props.so === os && (OPERATING_SYSTEMS as readonly string[]).includes(os)) : undefined;
  const initial = (detected ?? tabs[0])?.props.titulo;
  const [value, setValue] = React.useState<string | undefined>(initial);
  // o SO é conhecido de imediato no cliente; se mudar (ex.: troca de página), reabre na aba detectada
  React.useEffect(() => setValue(initial), [initial]);
  if (!tabs.length) return null;
  return (
    <Tabs value={value} onValueChange={setValue} className="docs-tabs my-5 border border-border rounded-md bg-card">
      <TabsList className="h-auto w-full justify-start gap-0 overflow-x-auto rounded-none rounded-t-md bg-muted/60 p-0 border-b border-border">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.props.titulo}
            value={tab.props.titulo}
            className="rounded-none px-4 py-2 text-[13px] focus-visible:ring-inset focus-visible:ring-offset-0 data-[state=active]:bg-card data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-semibold border-r border-border"
          >
            {tab.props.titulo}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.props.titulo} value={tab.props.titulo} className="px-4 py-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {tab.props.children}
        </TabsContent>
      ))}
    </Tabs>
  );
}
