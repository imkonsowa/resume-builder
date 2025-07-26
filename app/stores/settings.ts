import { defineStore } from 'pinia';
import type { AppSettings } from '~/types/resume';
import { defaultAppSettings } from '~/types/resume';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: { ...defaultAppSettings } as AppSettings
    }),

    persist: true,

    getters: {
        selectedFont: (state) => state.settings.selectedFont,
        selectedTemplate: (state) => state.settings.selectedTemplate,
        isRawMode: (state) => state.settings.isRawMode,
        showDownloadMenu: (state) => state.settings.showDownloadMenu,
        showFontMenu: (state) => state.settings.showFontMenu,
        showTemplateMenu: (state) => state.settings.showTemplateMenu,
        fontSize: (state) => state.settings.fontSize ?? 14
    },

    actions: {
        setSelectedFont(font: string) {
            this.settings.selectedFont = font;
        },

        setFontSize(size: number) {
            this.settings.fontSize = size;
        },

        setSelectedTemplate(template: string) {
            this.settings.selectedTemplate = template;
        },

        toggleRawMode() {
            this.settings.isRawMode = !this.settings.isRawMode;
        },

        setIsRawMode(value: boolean) {
            this.settings.isRawMode = value;
        },

        setShowDownloadMenu(value: boolean) {
            this.settings.showDownloadMenu = value;
        },

        setShowFontMenu(value: boolean) {
            this.settings.showFontMenu = value;
        },

        setShowTemplateMenu(value: boolean) {
            this.settings.showTemplateMenu = value;
        },

        closeAllMenus() {
            this.settings.showDownloadMenu = false;
            this.settings.showFontMenu = false;
            this.settings.showTemplateMenu = false;
        },

        resetSettings() {
            this.settings = { ...defaultAppSettings };
        },

        updateSettings(newSettings: Partial<AppSettings>) {
            this.settings = { ...this.settings, ...newSettings };
        }
    }
});
