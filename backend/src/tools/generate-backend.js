// tools/generate-backend.js
const { execSync } = require('child_process');

// 1. Grab arguments: Type (module/resource/service) and Name
const type = process.argv[2];
const nameProvided = process.argv[3];

if (!type || !nameProvided) {
  console.error('❌ Usage: node tools/generate-backend.js <type> <name>');
  console.error('👉 Example: node tools/generate-backend.js module users');
  process.exit(1);
}

// 2. Define the path where files should go
const targetPath = `backend/src/app/modules/${nameProvided}`;
const appModulePath = `backend/src/app/app.module.ts`;

console.log(`🛠️  Generating ${type} '${nameProvided}' in ${targetPath}...`);

// 3. Construct the command
// We only attach the --module flag if we are creating a new Module or Resource
// to ensure it gets imported into the main AppModule.
let command = `npx nx g @nx/nest:${type} ${targetPath}`;

if (type === 'module' || type === 'resource') {
  command += ` --module=${appModulePath}`;
}

// 4. Run it
try {
  execSync(command, { stdio: 'inherit' });
} catch (err) {
  // Errors are printed automatically by stdio: inherit
  process.exit(1);
}
