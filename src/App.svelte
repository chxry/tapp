<script lang="ts">
  import Score from "./Score.svelte";
  import * as Tone from "tone";

  const notes = [
    "D3",
    "D3",
    "D4",
    "A3",
    "G#3",
    "G3",
    "F3",
    "D3",
    "F3",
    "G3",
    "C3",
    "C3",
    "D4",
    "A3",
    "G#3",
    "G3",
    "F3",
    "D3",
    "F3",
    "G3",
    "B2",
    "B2",
    "D4",
    "A3",
    "G#3",
    "G3",
    "F3",
    "D3",
    "F3",
    "G3",
    "A#2",
    "A#2",
    "D4",
    "A3",
    "G#3",
    "G3",
    "F3",
    "D3",
    "F3",
    "G3",
  ];
  const table = Array(16).fill(false);
  const synth = new Tone.MembraneSynth({ volume: -10 }).toDestination();
  let score = 0;
  let localHighScore = parseInt(localStorage.getItem("highScore"));
  let highScore = localHighScore ? localHighScore : 0;

  const handlePieceClick = (e: MouseEvent, idx: number) => {
    let piece = table[idx];
    let target = <HTMLDivElement>e.target;
    setTimeout(() => (target.id = ""), 50);
    if (!piece) {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore.toString());
      }
      score = 0;
      target.id = "incorrect";
      return;
    }
    synth.triggerAttackRelease(notes[score % notes.length], "8n");
    target.id = "correct";
    score++;
    table[idx] = false;
    table[getRandomIndex(idx)] = true;
  };

  const getRandomIndex = (not: number) => {
    while (true) {
      let idx = Math.floor(Math.random() * table.length);
      if (!table[idx] && idx !== not) {
        return idx;
      }
    }
  };

  for (var i = 0; i < 3; i++) {
    table[getRandomIndex(0)] = true;
  }
</script>

<main>
  <div class="top">
    <h1>Tapp</h1>
    <Score label="SCORE" value={score} />
    <Score label="HIGH-SCORE" value={highScore} />
  </div>
  <div class="game">
    {#each Array(4) as _, row}
      <div class="row">
        {#each Array(4) as _, col}
          <div
            on:click={(e) => handlePieceClick(e, row * 4 + col)}
            class={["tile", table[row * 4 + col] ? "active" : ""].join(" ")}
          />
        {/each}
      </div>
    {/each}
  </div>
</main>
