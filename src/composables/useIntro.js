import { ref } from 'vue'

export const INTRO_DELAY = 1500

// Module-level, so it survives page switches and resets only on a full page load
export const introDone = ref(false)

let started = false

export function startIntro() {
    if (started) return
    started = true
    setTimeout(() => {
        introDone.value = true
    }, INTRO_DELAY)
}