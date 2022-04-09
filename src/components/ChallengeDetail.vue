<template>
  <div class="details">
    <span class="title">Titulo</span>
    <span class="time">Inicio às 2234</span>
    <span class="time">Fim às 2234</span>
    <span class="place">Local</span>
    <span class="description"></span>
    <form action="" class="form">
      <label for="validationCode">Código de validação</label>
      <span class="controls">
        <input id="validationCode" type="text" class="validation-code">
        <button class="button">Enviar</button>
      </span>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChallengeDetail"
}
</script>

<style scoped>

.details {
  margin: 5rem 0 5rem 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  padding: 1rem;
  background: #b19cd9;
  color: white;
  border: 5px solid #9400d3;
  width: 60%;
}

.form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
}

input {
  font: inherit;
  font-size: 1rem;
}

button {
  font: inherit;
  font-size: 1rem;
}

</style>