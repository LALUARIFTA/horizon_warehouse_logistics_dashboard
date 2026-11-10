// =========================================================================
// APP BOOTSTRAP — runs once the DOM is ready
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();

  // Normalize the URL without adding a history entry.
  if (!location.hash) {
    history.replaceState(null, '', '#/' + DEFAULT_MENU);
  }

  // Sync the dark-mode toggle knob with the saved theme applied in <head>.
  const isDark = document.documentElement.classList.contains('dark');
  const knob = document.getElementById('darkModeKnob');
  const switchEl = document.getElementById('darkModeSwitch');
  if (isDark && knob) knob.classList.add('translate-x-3.5');
  if (switchEl) switchEl.setAttribute('aria-checked', String(isDark));

  activate(currentHashKey());
});
