#include <iostream>
#include <ctime>
#include <cstdlib>

#define N 10

class Board {
public:
    char board[N][N];
    int last_move[2];
    //unsigned int current_player; // either 0 ('O') or 1 ('X')

    Board() {
        //current_player = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                board[i][j] = '.';
            }
        }
    }

    void print() {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                std::cout << board[i][j];
            }
            std::cout << std::endl;
        }
        std::cout << std::endl;
    }

    void make_move(int x, int y, char player) {
        board[x][y] = player;
    }

    bool checkWin(int x, int y, char player) {
        int dx[] = {-1, 0, 1, 1};
        int dy[] = {1, 1, 1, 0};

        for (int dir = 0; dir < 4; ++dir) {
            int count = 0;
            for (int i = -4; i <= 4; ++i) {
                int nx = x + i * dx[dir];
                int ny = y + i * dy[dir];
                if (nx >= 0 && nx < N && ny >= 0 && ny < N && board[nx][ny] == player) {
                    if (++count == 5) return true;
                } else {
                    count = 0;
                }
            }
        }

        return false;
    }

    void log_move() {
        std::cout << "[" << last_move[0] << ", " << last_move[1] << "], " << std::endl;
    }
};

void make_random_move(Board &B, char player) {
    std::srand(std::time(nullptr));
    int x = std::rand() % N;
    int y = std::rand() % N;

    while (B.board[x][y] != '.') {
        x = rand() % N;
        y = rand() % N;
    }

    // Make the move
    B.make_move(x, y, player);
    B.last_move[0] = x;
    B.last_move[1] = y;
}

int main() {
    Board B;
    // B.print();
    std::cout << "[";

    while (true) {
        make_random_move(B, 'O'); // 'O' starts always
        if (B.checkWin(B.last_move[0], B.last_move[1], 'O')) {
            // std::cout << "O wins!" << std::endl;
            std::cout << "[" << B.last_move[0] << ", " << B.last_move[1] << "]";
            break;
        }
        B.log_move();

        make_random_move(B, 'X');
        // B.print();
        // std::cout << "(last move: " << B.last_move[0] << ", " << B.last_move[1] << ")" << std::endl;
        if (B.checkWin(B.last_move[0], B.last_move[1], 'X')) {
            // std::cout << "X wins!" << std::endl;
            std::cout << "[" << B.last_move[0] << ", " << B.last_move[1] << "]";
            break;
        }
        B.log_move();
    }

        std::cout << "]" << std::endl;
}
