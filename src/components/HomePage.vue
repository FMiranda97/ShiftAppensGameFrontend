<template>
  <div class="home">
    <h1 class="welcome">Bem vindo ao Shift Appens</h1>

    <p>Queres te divertir durante o evento e ainda saires a ganhar?</p>

    <p>Durante o evento terás vários desafios com os quais receberás pontos.
    O jogador com mais pontos habilitár-se-à a ganhar um prémio.</p>

    <p>Pronto para começar?</p>

    <p>Na página inicial podes ver os desafios no momento que podes participar e os desafios mais tarde que poderás participar mais tarde. Caso queiras saber mais sobre desafio basta carrgares nos desafios da página principal.
      Após completares cada defafio receberás um código que terás que adicionar nesse mesmo desafio.
      Pode ainda acompanhar quem está a ganhar na Leaderboard.</p>

    <p>Que o melhor jogador ganhe <font-awesome-icon icon="face-smile" /></p>


  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>

.home {
  margin: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin-left: 20%;
}


.welcome {
  color: #9400d3;
}

@media (max-width: 50rem) {
  .home {
    width: 90%;
    margin-left: 5%;
  }

  .welcome {
    text-align: center;
  }
}

</style>