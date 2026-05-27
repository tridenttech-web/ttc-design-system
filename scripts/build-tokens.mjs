import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFormat({
    name: 'css/tailwind-theme',
    format: ({ dictionary }) => {
        const vars = dictionary.allTokens
            .map(token => `  --${token.name}: ${token.value};`)
            .join('\n');
        return `@theme inline {\n${vars}\n}\n`;
    }
})
StyleDictionary.registerFileHeader({
    name: 'tokenGenerated',
    fileHeader: (defaultMessage) => {
        return [...defaultMessage, `Made with care from the Trident Technical College Web Team`]
    }
})

const sd = new StyleDictionary({
    source: ['tokens/*.tokens.json'],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'src/styles/',
            files: [
                {
                    destination: 'tokens.css',
                    format: 'css/tailwind-theme',
                    options: {
                        fileHeader: "tokenGenerated"
                    }
                }
            ]
        }
    }
});

await sd.buildAllPlatforms();