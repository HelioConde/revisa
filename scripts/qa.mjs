import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index.html","utf8");
const css=fs.readFileSync("style.css","utf8");
const app=fs.readFileSync("app.js","utf8");

assert.match(html,/lang="pt-BR"/);
assert.match(html,/data-i18n="heroTitle"/);
assert.match(html,/id="review-form"/);
assert.match(html,/id="result"/);
assert.match(html,/privacidade\.html/);
assert.match(html,/termos\.html/);
assert.match(html,/PUBLICIDADE/);
assert.match(css,/@media\(max-width:680px\)/);
assert.match(css,/focus-visible/);
assert.match(app,/localStorage/);
assert.match(app,/buildSession/);
assert.match(app,/splitSentences/);
assert.match(app,/applyLanguage/);
assert.ok(fs.existsSync("sobre.html"));
assert.ok(fs.existsSync("privacidade.html"));
assert.ok(fs.existsSync("termos.html"));

console.log("Revisa static QA passed");