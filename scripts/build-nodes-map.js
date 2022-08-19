const glob = require('glob');
const fs = require('fs');
const path = require('path');

const import_list = [];
const json = [];

glob.sync('../src/nodes/**/*.{js,ts}', { cwd: __dirname })
  .forEach((file) => {
    // Trim path
    file = file.replace('../src/nodes/', '').replace('.js', '').replace('.ts', '');
    const import_name = file.split('/').pop();
    import_list.push(`import { default as ${import_name} } from './nodes/${file}';`);
    json.push(import_name);
  });

fs.writeFileSync(
  path.resolve(__dirname, '../src/map.ts'),
  `// This file was auto generated, do not edit.
// See ./scripts/build-nodes-map.js

${import_list.join('\n')}

const map: Record<string, any> = {
  ${json.join(',\n  ')}
};

export default function getNode(name: string) {
  const NodeConstructor = map[name];

  if (!NodeConstructor) {
    const error = new Error(\`Module not found: \${name}\`);
    (error as any).code = 'MODULE_NOT_FOUND';
    throw error;
  }

  return NodeConstructor;
}
`
);