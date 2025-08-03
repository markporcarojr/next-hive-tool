"use client";
import { Button } from "@mantine/core";
// @ts-ignore
import html2pdf from "html2pdf.js";

export default function DownloadInvoice({ htmlId }: { htmlId: string }) {
  const handleDownload = () => {
    const element = document.getElementById(htmlId);
    if (!element) return;

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `invoice-${new Date().toISOString()}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  return <Button onClick={handleDownload}>Download Invoice (PDF)</Button>;
}
