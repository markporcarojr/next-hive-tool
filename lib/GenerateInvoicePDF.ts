import puppeteer from "puppeteer";

export async function generateInvoicePDF(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "40px", bottom: "40px", left: "30px", right: "30px" },
  });

  await browser.close();
  return pdf;
}
