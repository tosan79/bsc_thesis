from enum import Enum
from typing import Literal
from loguru import logger

SIDE = 8


class P(Enum):  # 'p' stands for piece (or player)
    EMPTY = '.'
    NOUGHT = 'O'
    CROSS = 'X'

class OutOfRangeError(Exception):
    pass

class Board:
    def __init__(self) -> None:
        self._board = [[P.EMPTY] * SIDE for _ in range(SIDE)]

    def print_board(self) -> None:
        for row in self._board:
            print(''.join([mark.value for mark in row]))


    def place_piece(self, x: int, y: int, piece: P) -> None:
        if x < 0 or x > SIDE-1 or y < 0 or y > SIDE-1:
            raise OutOfRangeError(f'x and y must be between 0 and {SIDE-1}')
        self._board[x][y] = piece
        # print(x, y)

    def check_if_square_empty(self, x: int, y: int) -> bool:
        if x < 0 or x > SIDE-1 or y < 0 or y > SIDE-1:
            raise OutOfRangeError(f'x and y must be between 0 and {SIDE-1}')
        if self._board[x][y] == P.EMPTY:
            return True
        return False

    def check_win(self, piece: P) -> bool:
        # Sprawdzenie wierszy
        for row in range(SIDE):
            for col in range(SIDE - 4):  # Zmniejsz zakres, aby uniknąć wyjścia poza zakres
                if all(self._board[row][c] == piece for c in range(col, col + 5)):
                    return True

        # Sprawdzenie kolumn
        for col in range(SIDE):
            for row in range(SIDE - 4):  # Zmniejsz zakres, aby uniknąć wyjścia poza zakres
                if all(self._board[r][col] == piece for r in range(row, row + 5)):
                    return True

        # Sprawdzenie przekątnych (lewo-góra do prawo-dół)
        for row in range(SIDE - 4):
            for col in range(SIDE - 4):
                if all(self._board[row + i][col + i] == piece for i in range(5)):
                    return True

        # Sprawdzenie przekątnych (prawo-góra do lewo-dół)
        for row in range(SIDE - 4):
            for col in range(4, SIDE):
                if all(self._board[row + i][col - i] == piece for i in range(5)):
                    return True

        return False

class Player:

    def __init__(self, piece: Literal['O', 'X'], board: Board) -> None:
        if piece == 'O':
            self.piece = P.NOUGHT
        elif piece == 'X':
            self.piece = P.CROSS
        self.board = board

    def make_move(self, turn: bool) -> None:
        input_coords = input(
            f'player {self.piece.name} put {self.piece.value!r} [row, col]: '
        ).split(' ')
        p1 = int(input_coords[0]), int(input_coords[1])
        try:
            if self.board.check_if_square_empty(*p1):
                self.board.place_piece(*p1, piece=self.piece)
        except OutOfRangeError as e:
            logger.error(e)
        self.board.print_board()
        turn = not turn


if __name__ == '__main__':
    b = Board()
    b.print_board()

    p1 = Player('O', b)
    p2 = Player('X', b)

    turn = True  # true if it is p1's turn

    while True:
        p1.make_move(turn)
        p2.make_move(turn)
