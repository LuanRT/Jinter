import glob from 'glob';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const export_list = [];
const json = [];

glob.sync('../src/nodes/**/*.{js,ts}', { cwd: __dirname })
  .forEach((file) => {
    // Trim path
    file = file.replace('../src/nodes/', '').replace('.js', '').replace('.ts', '');

    const file_name = file.split('/').pop();

    if (file_name === 'index' || file_name === 'BaseJSNode')
      return;

    export_list.push(`export { default as ${file_name} } from './${file}.js';`);

    json.push(file_name);
  });

writeFileSync(
  resolve(__dirname, '../src/nodes/index.ts'),
  `// This file is generated automatically. Do not modify it.
${export_list.join('\n')}`
);