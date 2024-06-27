import fs from "fs";
import path from "path";

const pathArray = [
  "./node_modules/@chromatic-com/storybook/dist/preset.js",
  "./node_modules/@storybook/addon-interactions/dist/preset.js",
  "./node_modules/@storybook/addon-onboarding/dist/preset.js",
  "./node_modules/whatwg-url/lib/url-state-machine.js",
  "./node_modules/nodemailer/lib/mime-node/index.js",
  "./node_modules/nodemailer/lib/dkim/sign.js",
  "./node_modules/tr46/index.js",
];

for (const [_i, value] of pathArray.entries()) {
  try {
    // Read the content of the file
    const tr46Path = path.resolve(value);
    const content = fs.readFileSync(tr46Path, "utf8");
    replace(content, tr46Path);
    console.log(`punycode successfully patched ${value}`);
  } catch (error) {
    console.error(`punycode error patching ${value}`, error);
  }
}

/**
 * Replaces all occurrences of a specific line in the content and writes the updated content to a file.
 * @param {string} content - The original content.
 * @param {string} tr46Path - The path of the file to write the updated content to.
 */
function replace(content, tr46Path) {
  content = content.replace(/("punycode")/g, '("punycode/")');
  writeTheFile(content, tr46Path);
}

/**
 * Writes the modified content back to the file.
 *
 * @param {string} content - The modified content to write.
 * @param {string} tr46Path - The path of the file to write to.
 */
function writeTheFile(content, tr46Path) {
  fs.writeFileSync(tr46Path, content, "utf8");
}
