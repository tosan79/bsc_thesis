from tkinter import messagebox, Tk, Button
from demo import P, Board

SIDE = 8

class GuiBoard(Tk):
    def __init__(self, board):
        super().__init__()
        self.board = board
        self.current_player = P.NOUGHT
        self.title("noughts and crosses game -- for 5 in a row")
        self.buttons = [[None for _ in range(SIDE)] for _ in range(SIDE)]
        for x in range(SIDE):
            for y in range(SIDE):
                self.buttons[x][y] = self.create_button(x, y)
                self.buttons[x][y].grid(row=x, column=y)

    def create_button(self, x, y):
        return Button(self, text=' ', width=5, height=4, command=lambda x=x, y=y: self.on_click(x, y))

    def on_click(self, x, y):
        if self.board.check_if_square_empty(x, y):
            self.board.place_piece(x, y, self.current_player)
            self.buttons[x][y]['text'] = 'X' if self.current_player == P.CROSS else 'O'
            if self.board.check_win(self.current_player):
                self.end_game(f"Player {self.current_player} wins!")
            self.switch_player()

    def switch_player(self):
        self.current_player = P.NOUGHT if self.current_player == P.CROSS else P.CROSS

    def end_game(self, message):
        for x in range(SIDE):
            for y in range(SIDE):
                self.buttons[x][y]['command'] = lambda: None
        messagebox.showinfo("Game Over", message)

if __name__ == "__main__":
    board = Board()
    gui_board = GuiBoard(board)
    gui_board.mainloop()