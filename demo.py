from enum import Enum

class Sign(Enum):
    EMPTY = ' '
    WHITE = 'O'
    BLACK = 'X'

SIDE = 19

class Board:

    def __init__(self) -> None:
        self._board = (((Sign.EMPTY,) * SIDE) * SIDE)

    def print_board(self) -> None:
        for row in self._board:
            for field in row:





if __name__ == '__main__':
    b = Board()
    b.print_board()
