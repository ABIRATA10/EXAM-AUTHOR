import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// The config form starts around `<div className="p-6 space-y-6">`
const search = '<div className="p-6 space-y-6">';

const replacer = `
            <div className="p-6 space-y-6 relative">
              {isGenerating && (
                <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-b-xl border-t border-neutral-100">
                  <Loader2 className="w-12 h-12 text-[#b48b59] animate-spin mb-4" />
                  <h3 className="text-xl font-bold text-neutral-800">Generating Paper...</h3>
                  <p className="text-sm text-neutral-500 mt-2 max-w-sm text-center">
                    Please wait while our AI constructs a balanced question paper based on your specifications. This may take up to 20 seconds.
                  </p>
                </div>
              )}
`;

content = content.replace(search, replacer);

fs.writeFileSync('src/App.tsx', content);
