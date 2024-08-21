#!/bin/zsh
g++ gomoku_demo.cpp -o gomoku
./gomoku > noughts-and-crosses-for-5/public/moves.json
cd noughts-and-crosses-for-5
npm start
cd ..
rm gomoku
