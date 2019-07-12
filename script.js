const API_ENDPOINT = 'https://api.neverhaveiever.io/v1/statements/random';

const STATEMENT = document.querySelector('#js-ph-statement');
const LEVEL_SELECTION = document.querySelector('#js-ph-category-selection');

const TOGGLE_HARMLESS = document.querySelector('#js-ph-toggle-harmless');
const TOGGLE_DELICATE = document.querySelector('#js-ph-toggle-delicate');
const TOGGLE_OFFENSIVE = document.querySelector('#js-ph-toggle-offensive');

let blockRefresh = false;
let statementHistory = [];

/**
 * Fetches a new statement.
 */
function refreshStatement() {
  if (blockRefresh) {
    return;
  }

  axios
      .get(API_ENDPOINT, {
        crossdomain: true,
        params: {
          category: retrieveCategories(),
        },
      })
      .then(function(response) {
        if ('statement' in response.data && 'ID' in response.data) {
          if (statementHistory.indexOf(response.data.ID) !== -1) {
            refreshStatement();
          }

          STATEMENT.innerHTML = response.data.statement;
          statementHistory.push(response.data.ID);

          if (statementHistory.length > 50) {
            statementHistory = [];
          }
        } else {
          STATEMENT.innerHTML = 'Retarded API response.';
        }
      })
      .catch(function(error) {
        console.log(error);
        STATEMENT.innerHTML = 'Seems like the API is dead.';
      })
      .finally(function() {
        STATEMENT.classList.remove('ph-statement--animated');
      });
}

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', refreshStatement);
  document.addEventListener('keydown', refreshStatement);

  LEVEL_SELECTION.addEventListener('click', function(event) {
    event.stopPropagation();
  });

  [TOGGLE_HARMLESS, TOGGLE_DELICATE, TOGGLE_OFFENSIVE]
      .forEach(function(toggle) {
        toggle.addEventListener('change', function() {
          if (!TOGGLE_HARMLESS.checked &&
              !TOGGLE_DELICATE.checked &&
              !TOGGLE_OFFENSIVE.checked) {
            TOGGLE_HARMLESS.checked = true;
            TOGGLE_DELICATE.checked = true;
            TOGGLE_OFFENSIVE.checked = true;
          }
        });
      });

  window.addEventListener('offline', function() {
    blockRefresh = true;
    STATEMENT.innerHTML = 'Your internet connection sucks.';
  });

  window.addEventListener('online', function() {
    blockRefresh = false;
    STATEMENT.innerHTML = 'Welcome back! Tap to continue.';
  });

  refreshStatement();
});

/**
 * Retrieves categories.
 *
 * @return {Array}
 */
function retrieveCategories() {
  const categories = [];

  if (TOGGLE_HARMLESS.checked) {
    categories.push('harmless');
  }

  if (TOGGLE_DELICATE.checked) {
    categories.push('delicate');
  }

  if (TOGGLE_OFFENSIVE.checked) {
    categories.push('offensive');
  }

  return categories;
}
