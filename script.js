/**
 * Patient Records Manager – Website Script
 * Fetches version.json to display the current app version dynamically.
 * No external frameworks used.
 */

(function () {
  'use strict';

  const VERSION_URL = './version.json';

  // Elements that show the version number
  const versionBadges = document.querySelectorAll('.js-version');
  const downloadBtn   = document.getElementById('download-btn');
  const releaseDateEl = document.getElementById('release-date');
  const releaseNotesEl = document.getElementById('release-notes-text');

  function setVersion(data) {
    versionBadges.forEach(function (el) {
      el.textContent = 'v' + data.version;
    });

    if (releaseDateEl && data.releaseDate) {
      const d = new Date(data.releaseDate);
      releaseDateEl.textContent = d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    if (releaseNotesEl && data.releaseNotes) {
      releaseNotesEl.textContent = data.releaseNotes;
    }

    // Update download button href if a real URL has been set
    if (
      downloadBtn &&
      data.downloadUrl &&
      data.downloadUrl !== 'REPLACE_WITH_GOOGLE_DRIVE_DIRECT_LINK'
    ) {
      downloadBtn.href = data.downloadUrl;
    }
  }

  fetch(VERSION_URL)
    .then(function (res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(setVersion)
    .catch(function (err) {
      console.warn('Could not load version.json:', err);
      // HTML already contains fallback version text — leave it unchanged
    });

  // Smooth scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
