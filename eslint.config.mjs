// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
		ignores: ['app/components/ui/**/*']
	},
	{
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
		files: ['nuxt.config.ts', '*.config.ts', '*.config.js'],
		rules: {
			'no-undef': 'off'
		}
	}
).append({
	rules: {
		// Strict TypeScript rules
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
			'script': {'lang': 'ts'}
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
});
