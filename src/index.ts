import { PathLike } from "fs";
import fs from "fs/promises";
import { parse, HTMLElement } from "node-html-parser";

async function getFileContent(fileNanme: PathLike) {
  const content = await fs.readFile(fileNanme, { encoding: "utf8" });
  return content;
}

async function writeFile(file: PathLike, data: string) {
  await fs.writeFile(file, data);
}

function fixLink(element: HTMLElement) {
  const oldHref = element.getAttribute("href")!;
  const newHref = oldHref.replace(`/src`, "");
  element.setAttribute("href", newHref);
}

async function fixFileLinks(file: PathLike) {
  const content = await getFileContent(file);
  const HTMLdocument = parse(content);
  const links = HTMLdocument.querySelectorAll('a[href$=".html"]');
  links.forEach((element) => {
    fixLink(element);
  });
  await writeFile("./index.html", HTMLdocument.innerHTML);
}

async function renameDir(oldPath: PathLike, newPath: PathLike) {
  try {
    await fs.rename(oldPath, newPath);
    console.log(`renamed ${oldPath} to ${newPath}`);
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  await renameDir("./src/pages", "./pages");
  fixFileLinks("./index.html");
}

main();
