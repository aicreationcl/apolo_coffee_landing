"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadMenuButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    setIsGenerating(true);
    try {
      // `@react-pdf/renderer` es una librería pesada — se carga solo al
      // hacer clic (code-split) en vez de ir en el bundle inicial de todas
      // las visitas, la gran mayoría de las cuales nunca descarga el PDF.
      const [{ pdf }, { MenuPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/sections/menu/MenuPdfDocument"),
      ]);
      const blob = await pdf(<MenuPdfDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "apolo-coffee-menu.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Button type="button" variant="outline" onClick={handleDownload} disabled={isGenerating}>
      {isGenerating ? <Loader2 className="animate-spin" /> : <Download />}
      {isGenerating ? "Generando PDF…" : "Descargar menú completo"}
    </Button>
  );
}
