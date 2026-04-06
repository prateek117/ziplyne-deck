/**
 * Multi-page PDF: one full-page screenshot per slide (same look as the original),
 * with **clickable http(s) links** (Docs, etc.) via PDF link annotations on top of the image.
 *
 * 1) npm run build
 * 2) npm run preview:pdf
 * 3) In another terminal: npm run pdf
 *
 * Optional: PDF_BASE_URL=http://127.0.0.1:5173 npm run pdf
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { PDFDocument, PDFString } from "pdf-lib";
import { SLIDE_COUNT } from "../src/deckInfo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const DEFAULT_BASE = "http://127.0.0.1:4173";
const OUT_FILE = path.join(root, "v8-release-deck.pdf");

function waitForHttp(url, maxMs = 90000) {
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const tryOnce = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - t0 > maxMs) {
          reject(
            new Error(
              `Could not reach ${url}\n\nRun in one terminal: npm run build && npm run preview:pdf\nThen run: npm run pdf`
            )
          );
        } else {
          setTimeout(tryOnce, 300);
        }
      });
    };
    tryOnce();
  });
}

/** Bounding boxes of external links in **CSS pixel** document coordinates. */
async function collectHttpLinkRects(page) {
  return page.evaluate(() => {
    const out = [];
    for (const a of document.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("http://") && !href.startsWith("https://")) continue;
      const r = a.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      out.push({
        uri: a.href,
        left: r.left + window.pageXOffset,
        top: r.top + window.pageYOffset,
        width: r.width,
        height: r.height,
      });
    }
    return out;
  });
}

async function cssLayoutSize(page) {
  return page.evaluate(() => {
    const el = document.documentElement;
    const body = document.body;
    const w = Math.max(el.scrollWidth, body?.scrollWidth ?? 0, el.clientWidth);
    const h = Math.max(el.scrollHeight, body?.scrollHeight ?? 0, el.clientHeight);
    return { cssWidth: w, cssHeight: h };
  });
}

/**
 * PDF /Link Rect uses bottom-left origin: [llx, lly, urx, ury].
 */
function addUriLinkAnnotation(pdfDoc, pdfPage, llx, lly, urx, ury, uri) {
  const context = pdfDoc.context;
  const action = context.obj({
    Type: "Action",
    S: "URI",
    URI: PDFString.of(uri),
  });
  const annot = context.obj({
    Type: "Annot",
    Subtype: "Link",
    Rect: [llx, lly, urx, ury],
    Border: [0, 0, 0],
    A: action,
  });
  pdfPage.node.addAnnot(context.register(annot));
}

function addLinkAnnotationsForPage(
  pdfDoc,
  pdfPage,
  pageWidthPt,
  pageHeightPt,
  cssWidth,
  cssHeight,
  links
) {
  const scaleX = pageWidthPt / cssWidth;
  const scaleY = pageHeightPt / cssHeight;

  for (const { uri, left, top, width, height } of links) {
    const llx = left * scaleX;
    const urx = (left + width) * scaleX;
    const lly = pageHeightPt - (top + height) * scaleY;
    const ury = pageHeightPt - top * scaleY;

    if (urx <= llx || ury <= lly) continue;

    addUriLinkAnnotation(pdfDoc, pdfPage, llx, lly, urx, ury, uri);
  }
}

async function main() {
  const base = (process.env.PDF_BASE_URL || DEFAULT_BASE).replace(/\/$/, "");
  await waitForHttp(`${base}/`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
  });

  const mergedPdf = await PDFDocument.create();

  try {
    for (let i = 0; i < SLIDE_COUNT; i++) {
      const url = `${base}/?slide=${i}`;
      console.log(`Rendering slide ${i + 1}/${SLIDE_COUNT} …`);
      await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
      await page.evaluate(() => document.fonts.ready);
      await new Promise((r) => setTimeout(r, 700));

      const links = await collectHttpLinkRects(page);
      const { cssWidth, cssHeight } = await cssLayoutSize(page);

      const pngBuffer = await page.screenshot({ fullPage: true, type: "png" });
      const image = await mergedPdf.embedPng(pngBuffer);
      const pdfPage = mergedPdf.addPage([image.width, image.height]);
      pdfPage.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });

      addLinkAnnotationsForPage(
        mergedPdf,
        pdfPage,
        image.width,
        image.height,
        cssWidth,
        cssHeight,
        links
      );
    }
  } finally {
    await browser.close();
  }

  fs.writeFileSync(OUT_FILE, await mergedPdf.save());
  console.log(`Wrote ${OUT_FILE}`);
  console.log("External links (e.g. Docs) should be clickable in Acrobat / Preview / Chrome PDF viewer.");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
