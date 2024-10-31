<script>
  import Score from "./Score.svelte";

  let table;
  let size = 4;

  let score = 0;
  let localHighScore = parseInt(localStorage.getItem("highScore"));
  let highScore = localHighScore ? localHighScore : 0;

  const handlePieceClick = (e, idx) => {
    let piece = table[idx];
    setTimeout(() => (e.target.id = ""), 50);
    if (!piece) {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore.toString());
      }
      score = 0;
      e.target.id = "incorrect";
      return;
    }
    e.target.id = "correct";
    score++;
    table[idx] = false;
    table[getRandomIndex(idx)] = true;
  };

  const getRandomIndex = (not) => {
    while (true) {
      let idx = Math.floor(Math.random() * table.length);
      if (!table[idx] && idx !== not) {
        return idx;
      }
    }
  };

  const init = () => {
    table = Array(size ** 2).fill(false);
    score = 0;
    for (let i = 0; i < 3; i++) {
      table[getRandomIndex(0)] = true;
    }
  }
  init();
</script>

<main>
  <div class="top">
    <h1>Tapp</h1>
    <Score label="SCORE" value={score} />
    <Score label="HIGH-SCORE" value={highScore} />
  </div>
  <div class="game">
    {#each Array(size) as _, row}
      <div class="row">
        {#each Array(size) as _, col}
          <div
            on:mousedown={(e) => handlePieceClick(e, row * size + col)}
            class={["tile", table[row * size + col] ? "active" : ""].join(" ")}
          />
        {/each}
      </div>
    {/each}
  </div>
  <!-- <button on:click={() => {size = 5; init();}}>mrow</button> -->
</main>
