(function() {

  this.board = [];
  this.pieces = [];
  this.selectedPiece = '';

  var board = document.querySelector('.game-board');
  var pieces = document.querySelector('.game-pieces');

  this.setupBoard = function(board, dimension) {

    var game = this;
    board.innerHTML = '';

    for (var x = 0; x < dimension; x++) {
      for (var y = 0; y < dimension; y++) {
        spot = document.createElement('span');
        spot.className = 'spot';
        spot.setAttribute('x', x);
        spot.setAttribute('y', y);
        spot.setAttribute('isOpen', true);

        spot.onclick = function () {
          if (game.selectedPiece){
            // TODO: Check if legal to place

            game.selectedPiece.className = 'piece-hidden';
            game.selectedPiece.setAttribute('isPlaced', true);

            this.className += ' spot-on';

            game.selectedPiece = '';
            game.resetPieces();
          }
        };

        if (y === 0){
          spot.className += ' spot-clear';
        }

        this.board.push(spot);
        board.appendChild(spot);
      }
    }

  };

  this.resetPieces = function() {
    var game = this;

    for (var i = 0; i < game.pieces.length; i++){
      var piece = game.pieces[i];
      var isPlaced = piece.getAttribute('isPlaced');
      if (isPlaced === false){
        piece.className = 'piece';
      }
    }
  };

  this.setupPieces = function(pieces, count) {

    var game = this;
    pieces.innerHTML = '';

    for (var i = 0; i < count; i++) {
      piece = document.createElement('span');
      piece.className = 'piece';
      piece.setAttribute('isPlaced', false);

      piece.onclick = function () {
        game.resetPieces();
        this.className = 'piece piece-selected';
        game.selectedPiece = this;
      };

      this.pieces.push(piece);
      pieces.appendChild(piece);
    }

  };

  var dimension = 5;

  this.setupBoard(board, dimension);
  this.setupPieces(pieces, dimension * dimension);

})();
