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

        spot.onclick = function () {
          if (game.selectedPiece){
            var id = game.selectedPiece.getAttribute('id');
            game.pieces[id].className = 'piece-hidden';
            game.pieces.splice(id, 1);
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
    var count = this.pieces.length;
    for (var i = 0; i < count; i++){
      this.pieces[i].className = 'piece';
    }
  };

  this.setupPieces = function(pieces, count) {

    var game = this;
    pieces.innerHTML = '';

    for (var i = 0; i < count; i++) {
      piece = document.createElement('span');
      piece.className = 'piece';
      piece.setAttribute('id', i);

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
