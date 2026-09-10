/* redirect-links.js — Number Matching mini-game modal for v49 Singapore Skyline */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    function resolveRedirectUrl() {
      return typeof window.getRedirectUrl === 'function'
        ? window.getRedirectUrl()
        : (window.REDIRECT_URL || '#');
    }

    var redirectUrl = resolveRedirectUrl();

    /* --- Wire all .redirect-link anchors --- */
    var links = document.querySelectorAll('a.redirect-link');
    for (var i = 0; i < links.length; i++) {
      links[i].href = redirectUrl;
    }

    /* --- Element refs --- */
    var mainCta      = document.getElementById('main-cta');
    var modal        = document.getElementById('casino-modal');
    var modalTitle   = document.getElementById('modal-title');
    var modalMessage = document.getElementById('modal-message');
    var finalCta     = document.getElementById('final-cta');
    var matchGrid    = document.getElementById('match-grid');

    if (!mainCta || !modal || !matchGrid) return;

    /* -------------------------------------------------------
     * Number Matching game state
     * 4×3 grid = 12 tiles = 6 pairs (numbers 1–6, each twice)
     * Always winnable: shuffled deck guarantees all pairs exist.
     * ------------------------------------------------------- */
    var PAIRS_COUNT  = 6;
    var TOTAL_TILES  = PAIRS_COUNT * 2;

    var gameState = {
      tiles: [],          // DOM elements
      values: [],         // numeric value per tile index
      flipped: [],        // indices currently face-up (max 2)
      matched: 0,         // count of matched pairs
      locked: false,      // prevents clicks during mismatch delay
    };

    /** Fisher-Yates shuffle in place */
    function shuffle(arr) {
      for (var j = arr.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var tmp = arr[j];
        arr[j] = arr[k];
        arr[k] = tmp;
      }
      return arr;
    }

    /** Build a fresh shuffled deck: [1,1,2,2,...,6,6] shuffled */
    function buildDeck() {
      var deck = [];
      for (var n = 1; n <= PAIRS_COUNT; n++) {
        deck.push(n, n);
      }
      return shuffle(deck);
    }

    /** Reset game UI and state */
    function initGame() {
      matchGrid.innerHTML = '';
      gameState.tiles   = [];
      gameState.values  = buildDeck();
      gameState.flipped = [];
      gameState.matched = 0;
      gameState.locked  = false;

      for (var idx = 0; idx < TOTAL_TILES; idx++) {
        var tile = document.createElement('div');
        tile.className = 'match-tile';
        tile.setAttribute('data-index', idx);
        tile.setAttribute('aria-label', 'Ô bài ' + (idx + 1));
        tile.setAttribute('role', 'button');
        tile.setAttribute('tabindex', '0');
        matchGrid.appendChild(tile);
        gameState.tiles.push(tile);

        /* click handler */
        tile.addEventListener('click', onTileClick);
        /* keyboard accessibility */
        tile.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onTileClick.call(this, e);
          }
        });
      }

      modalTitle.textContent   = 'GHÉP CẶP SỐ MAY MẮN';
      modalMessage.textContent = 'Lật các ô để tìm cặp số giống nhau!';
      modalMessage.classList.remove('success-text');
      finalCta.classList.add('hidden');
    }

    /** Flip a tile face-up to show its number */
    function flipTile(tile, index) {
      tile.textContent = gameState.values[index];
      tile.classList.add('flipped');
    }

    /** Hide a tile back face-down */
    function unflipTile(tile) {
      tile.textContent = '';
      tile.classList.remove('flipped');
    }

    /** Mark a matched pair */
    function markMatched(idxA, idxB) {
      gameState.tiles[idxA].classList.add('matched');
      gameState.tiles[idxB].classList.add('matched');
      gameState.matched++;

      if (gameState.matched === PAIRS_COUNT) {
        onAllMatched();
      }
    }

    /** Called when all pairs are found */
    function onAllMatched() {
      modalTitle.textContent   = 'CHÚC MỪNG!';
      modalMessage.textContent = 'Chúc mừng! Bạn đã hoàn thành!';
      modalMessage.classList.add('success-text');
      finalCta.textContent = 'NHẬN THƯỞNG & VÀO CHƠI NGAY';
      finalCta.classList.remove('hidden');
    }

    /** Handle tile click */
    function onTileClick() {
      if (gameState.locked) return;

      var index = parseInt(this.getAttribute('data-index'), 10);

      /* Ignore already-flipped or matched tiles */
      if (
        this.classList.contains('matched') ||
        this.classList.contains('flipped')
      ) return;

      /* Ignore a third simultaneous flip */
      if (gameState.flipped.length === 2) return;

      flipTile(this, index);
      gameState.flipped.push(index);

      if (gameState.flipped.length === 2) {
        var idxA = gameState.flipped[0];
        var idxB = gameState.flipped[1];

        if (gameState.values[idxA] === gameState.values[idxB]) {
          /* Match found */
          gameState.flipped = [];
          markMatched(idxA, idxB);
        } else {
          /* No match — flip back after short delay */
          gameState.locked = true;
          setTimeout(function () {
            unflipTile(gameState.tiles[idxA]);
            unflipTile(gameState.tiles[idxB]);
            gameState.flipped = [];
            gameState.locked  = false;
          }, 900);
        }
      }
    }

    /* --- Main CTA click → open modal & start game --- */
    mainCta.addEventListener('click', function (e) {
      e.preventDefault();
      modal.style.display = 'flex';
      initGame();
    });

    /* --- Final CTA → redirect --- */
    finalCta.addEventListener('click', function () {
      window.location.href = resolveRedirectUrl();
    });

    /* --- Close modal on overlay backdrop click --- */
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    /* --- Data visualization bars progressive fill on page load --- */
    var barFills = document.querySelectorAll('.data-bar-fill[data-target]');
    if (barFills.length) {
      /* Small delay so CSS transition is visible after paint */
      setTimeout(function () {
        for (var b = 0; b < barFills.length; b++) {
          barFills[b].style.width = barFills[b].getAttribute('data-target');
        }
      }, 400 + (barFills.length > 1 ? 100 : 0));

      /* Stagger each bar slightly */
      for (var b = 0; b < barFills.length; b++) {
        barFills[b].style.transitionDelay = (b * 0.12) + 's';
      }
    }
  });
})();
