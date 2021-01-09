import React, { useState, useEffect } from "react";
import * as Tone from "tone";

var synth = new Tone.MembraneSynth({ volume: -10 }).toDestination();

function Game() {
  const tableRes = 4;
  const tableSize = 600;
  const starting = 3;

  const [table, setTable] = useState(new Array(tableRes ** 2).fill(false));
  const [game, setGame] = useState({ failed: false, score: 0 });

  function handlePieceClick(e, piece, idx) {
    if (!piece) {
      setGame({ ...game, ...{ failed: true } });
      e.target.classList.add("pieceIncorrect");
      setTimeout(() => e.target.classList.remove("pieceIncorrect"), 50);
      return;
    }
    let tempTable = [...table];
    tempTable[idx] = false;
    tempTable[getRandomIndex(tempTable, idx)] = true;
    setTable(tempTable);
    if (game.failed) {
      setGame({ failed: false, score: 0 });
    } else {
      setGame({ ...game, ...{ score: game.score + 1 } });
    }
    synth.triggerAttackRelease("C3", "8n");
    e.target.classList.add("pieceAnim");
    setTimeout(() => e.target.classList.remove("pieceAnim"), 50);
  }

  function getRandomIndex(table, not) {
    //This probably isn't good
    while (true) {
      let idx = Math.floor(Math.random() * table.length);
      if (!table[idx] && idx !== not) {
        return idx;
      }
    }
  }

  useEffect(() => {
    let tempTable = [...table];
    for (var i = 0; i < starting; i++) {
      tempTable[getRandomIndex(tempTable, 0)] = true;
    }
    setTable(tempTable);
  }, []);

  return (
    <div className="app">
      <div className="above" style={{ width: tableSize }}>
        <h1>Tapp</h1>
        <div className="scoreElement">
          <h5>SCORE</h5>
          <h2>{game.score}</h2>
        </div>
        <div className="scoreElement">
          <h5>HIGH-SCORE</h5>
          <h2>...</h2>
        </div>
      </div>
      <div className="table" style={{ width: tableSize, height: tableSize }}>
        {table.map((piece, idx) => (
          <div
            key={idx}
            id={piece ? "pieceActive" : "piece"}
            style={{
              width: tableSize / tableRes,
              height: tableSize / tableRes,
            }}
            onMouseDown={(e) => handlePieceClick(e, piece, idx)}
          />
        ))}
      </div>
      <div className="below" style={{ width: tableSize }}>
        <h3>Settings:</h3>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}

export default Game;
