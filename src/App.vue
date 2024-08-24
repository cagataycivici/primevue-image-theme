<template>
    <main class="min-h-screen p-4 sm:p-8 bg-surface-0 dark:bg-surface-950">
        <div class="flex flex-wrap items-center justify-center border-b border-surface pb-4 gap-4">
            <h1 class="text-center text-xl font-medium">Always bet on Prime!</h1>
            <div class="flex items-center gap-4 ml-auto">
                <a
                    href="https://github.com/cagataycivici/primevue-image-theme"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-muted-color border-r border-surface pr-4 hover:text-color"
                    ><i class="pi pi-github !text-lg"></i
                ></a>
                <span>Dark Mode</span>
                <ToggleSwitch v-model="darkMode" @change="onDarkModeChange" class="ml-auto" />
            </div>
        </div>

        <div class="bg-surface-50 dark:bg-surface-900 rounded-xl my-8 max-w-2xl mx-auto p-8">
            <div class="flex justify-between">
                <FileUpload
                    mode="basic"
                    @select="onFileChange"
                    customUpload
                    auto
                    severity="secondary"
                    class="p-button-outlined"
                />
                <Button
                    type="button"
                    label="Generate"
                    @click="generateTheme"
                    :disabled="!primary"
                />
            </div>
            <div
                v-if="src"
                class="border-t border-surface mt-8 p-animate-fadein animate-fadein animate-duration-700"
            >
                <div class="flex justify-center py-8">
                    <img
                        id="theme-image"
                        :src="src"
                        class="sm:h-44 shadow-md rounded-xl shrink-0"
                    />
                </div>
                <div class="border-t border-surface pt-8" v-if="primary && surface">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-wrap justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <label for="in_primary" class="block min-w-16">Primary</label>
                                <input
                                    type="color"
                                    id="in_primary"
                                    v-model="primary"
                                    class="w-4 h-4 sm:w-8 sm:h-8 border-surface rounded-sm"
                                />
                            </div>

                            <div class="flex border border-surface">
                                <div
                                    v-for="color of primaryColors"
                                    :key="color"
                                    class="w-4 h-4 sm:w-8 sm:h-8"
                                    :style="{ backgroundColor: color }"
                                ></div>
                            </div>
                        </div>

                        <div class="flex flex-wrap justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <label for="in_surface" class="block min-w-16">Surface</label>
                                <input
                                    type="color"
                                    id="in_surface"
                                    v-model="surface"
                                    class="w-4 h-4 sm:w-8 sm:h-8 border-surface rounded-sm"
                                />
                            </div>

                            <div class="flex border border-surface">
                                <div
                                    v-for="color of surfaceColors"
                                    :key="color"
                                    class="w-4 h-4 sm:w-8 sm:h-8"
                                    :style="{ backgroundColor: color }"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Cards />
    </main>
</template>

<script setup>
import { palette, updatePrimaryPalette, updateSurfacePalette } from '@primevue/themes';
import { average, prominent } from 'color.js';

import { computed, nextTick, ref } from 'vue';
import Cards from './components/Cards.vue';

const darkMode = ref(false);
const src = ref(null);
const primary = ref(null);
const surface = ref(null);
const primaryPalette = computed(() => palette(primary.value));
const surfacePalette = computed(() => palette(surface.value));
const primaryColors = computed(() => Object.entries(primaryPalette.value));
const surfaceColors = computed(() => Object.entries(surfacePalette.value));

function onDarkModeChange() {
    if (!document.startViewTransition) {
        toggleDarkMode();

        return;
    }

    document.startViewTransition(() => toggleDarkMode());
}

function toggleDarkMode() {
    if (darkMode.value) document.documentElement.classList.add('app-dark');
    else document.documentElement.classList.remove('app-dark');
}

function generateTheme() {
    updatePrimaryPalette(primaryPalette.value);
    updateSurfacePalette(surfacePalette.value);
}

function processFile(file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
        src.value = e.target.result;
        await nextTick();

        const imageElement = document.getElementById('theme-image');
        prominent(imageElement, { amount: 1, format: 'hex' }).then((color) => {
            if (color) {
                primary.value = color;
            }
        });

        average(imageElement, { amount: 1, format: 'hex' }).then((color) => {
            if (color) {
                surface.value = color;
            }
        });
    };
    reader.readAsDataURL(file);
}

function onFileChange(event) {
    const file = event.files[0];
    processFile(file);
}
</script>
