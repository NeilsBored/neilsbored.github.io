/*
  script.js

  This file loads configuration from site.config.json if present and
  uses it to populate the portfolio with personalised content.  It
  then fetches repository data from the GitHub API to build out a
  simple projects grid.  If the API rate limit is hit, the grid
  gracefully fails to empty state.
*/

(function () {
  const YEAR_ELEMENT = document.getElementById('year');
  const NAME_ELEMENT = document.getElementById('name');
  const EMAIL_LINK = document.getElementById('email-link');
  const HERO_HEADING = document.querySelector('header h1');
  const HERO_TAGLINE = document.querySelector('header p');
  const ABOUT_TEXT = document.querySelector('#about p');
  const PROJECTS_GRID = document.getElementById('projects-grid');

  /**
   * Loads the JSON configuration for the site.  If the file
   * doesn't exist or fails to parse, an empty object is returned.
   *
   * @returns {Promise<Object>} configuration data
   */
  async function loadConfig() {
    try {
      const res = await fetch('site.config.json');
      if (!res.ok) throw new Error('No config file');
      return await res.json();
    } catch (err) {
      console.warn('Config not found or invalid, using defaults.', err);
      return {};
    }
  }

  /**
   * Renders the projects grid based on GitHub API data.  The
   * repositories are sorted so that any explicitly featured names
   * appear first, followed by the remaining most recently updated
   * repositories.  Private repositories and the user's GitHub
   * Pages repo (username.github.io) are ignored.
   *
   * @param {string} username GitHub username
   * @param {string[]} featuredNames List of repository names to show first
   */
  async function renderProjects(username, featuredNames = []) {
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
      );
      if (!res.ok) throw new Error('Failed to fetch repos');
      const repos = await res.json();
      // Filter out private repos and the GitHub Pages repo itself
      const filtered = repos.filter(
        (r) => !r.private && r.name !== `${username}.github.io`
      );
      // Determine ordering: featured first, then the rest
      const featured = filtered.filter((r) => featuredNames.includes(r.name));
      const others = filtered.filter((r) => !featuredNames.includes(r.name));
      const combined = [...featured, ...others].slice(0, 6);
      // Clear any existing content
      PROJECTS_GRID.innerHTML = '';
      combined.forEach((repo) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        const description = repo.description || 'No description provided.';
        card.innerHTML = `
          <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
          <p>${description}</p>
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="btn btn-outline">View on GitHub</a>
        `;
        PROJECTS_GRID.appendChild(card);
      });
    } catch (err) {
      console.error(err);
      // If we can't fetch repos, leave a friendly message
      PROJECTS_GRID.innerHTML = '<p>Unable to load projects at this time.</p>';
    }
  }

  /**
   * Populates the page with information from the configuration and
   * loads projects.  Defaults are used if configuration values are
   * missing.
   */
  async function init() {
    const config = await loadConfig();
    const username = config.username || 'NeilsBored';
    // Update hero heading and tagline
    const firstName = config.name ? config.name.split(' ')[0] : 'Shane';
    HERO_HEADING.textContent = `Hi, I'm ${firstName}`;
    HERO_TAGLINE.textContent = config.tagline || 'I build things with code.';
    // Update about text
    ABOUT_TEXT.textContent =
      config.about ||
      "I'm a software engineer with a passion for building delightful experiences.  This site pulls my latest GitHub repositories to showcase what I've been working on.";
    // Update email link
    if (config.email) {
      EMAIL_LINK.href = `mailto:${config.email}`;
    }
    // Update footer name and year
    NAME_ELEMENT.textContent = config.name || 'Shane John';
    YEAR_ELEMENT.textContent = new Date().getFullYear();
    // Render projects grid
    await renderProjects(username, config.featured || []);
  }

  // Kick off initialisation when the DOM is ready
  document.addEventListener('DOMContentLoaded', init);
})();