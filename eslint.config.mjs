// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    // Your custom configs here
    {
    // Exclude auto-generated UI components from strict type checking
        files: ['**/components/ui/**/*.{ts,js,vue}', '**/ui/**/*.{ts,js,vue}'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'vue/require-default-prop': 'off',
            'vue/define-macros-order': 'off',
            'no-implicit-coercion': 'off',
            '@typescript-eslint/prefer-function-type': 'off'
        }
    },
    {
    // Exclude Nuxt config files from no-undef
        files: ['nuxt.config.ts', '*.config.ts', '*.config.js'],
        rules: {
            'no-undef': 'off'
        }
    },
    // Global formatting rules
    {
        rules: {
            // Indentation rules - 4 spaces
            'indent': ['error', 4, {
                'SwitchCase': 1,
                'VariableDeclarator': 1,
                'outerIIFEBody': 1,
                'MemberExpression': 1,
                'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
                'FunctionExpression': { 'parameters': 1, 'body': 1 },
                'CallExpression': { 'arguments': 1 },
                'ArrayExpression': 1,
                'ObjectExpression': 1,
                'ImportDeclaration': 1,
                'flatTernaryExpressions': false,
                'ignoreComments': false
            }],
            // Vue-specific indentation
            'vue/html-indent': ['error', 4, {
                'attribute': 1,
                'baseIndent': 1,
                'closeBracket': 0,
                'alignAttributesVertically': true,
                'ignores': []
            }],
            'vue/script-indent': ['error', 4, {
                'baseIndent': 0,
                'switchCase': 1,
                'ignores': []
            }],
            // Other formatting rules
            'semi': ['error', 'always'],
            'quotes': ['error', 'single', { 'avoidEscape': true }],
            'comma-dangle': ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'space-before-function-paren': ['error', {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always'
            }],
            'keyword-spacing': ['error', { 'before': true, 'after': true }],
            'space-infix-ops': 'error',
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
            'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

            // Strict TypeScript rules (no type information required)
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-this-alias': 'error',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-function-type': 'error',

            // Vue-specific strict typing
            'vue/block-lang': ['error', {
                'script': { 'lang': 'ts' }
            }],
            'vue/component-api-style': ['error', ['script-setup']],
            'vue/define-macros-order': 'error',
            'vue/no-required-prop-with-default': 'error',
            'vue/prefer-separate-static-class': 'error',
            'vue/prefer-true-attribute-shorthand': 'error',

            // Additional type safety
            'no-implicit-coercion': 'error',
            'no-implicit-globals': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
            'no-undef': 'error'
        }
    }
);
