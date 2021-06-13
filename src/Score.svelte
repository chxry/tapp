<script lang="ts">
  export let label: string;
  export let value: number;
</script>

<div class="score">
  <h5>{label}</h5>
  <h2>{value}</h2>
</div>

<style>
  .score {
    margin-left: 16px;
  }

  h2, h5 {
    text-align: right;
  }

  h2 {
    font-size: 40px;
  } 

  h5 {
    font-weight: 400;
  }
</style>