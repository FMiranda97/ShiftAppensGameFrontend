<template>
  <div class="home">
    <h1 class="welcome">Bem vindo ao Shift Appens</h1>

    <p>Queres te divertir durante o evento e ainda sair a ganhar?</p>

    <p>Durante o evento terás vários desafios como por exemplo ir a workshops com os quais receberás pontos.
      O jogador com mais pontos habilitar-se-à a ganhar um prémio.</p>

    <p>Pronto para começar?</p>

    <p>Na página inicial podes ver os desafios que podes participar no momento e os que vão decorrer mais tarde. Caso queiras saber mais sobre cada desafio basta clicares nos desafios apresentados na página inicial e serás redirecionado para uma página com todos os detalhes e informações desse desafio.

      </p>

    <p>Após completares cada desafio receberás um código dado pela staff o qual terás que adicionar nesse mesmo desafio para acomulares os pontos.</p>
    <p>Para acompanhares a tua posição na competição e a dos restantes participantes basta ires a Leaderboard.</p>

    <p>Que o melhor jogador ganhe <font-awesome-icon icon="face-smile" /></p>

    <router-link to="/signup" class="button">Começar</router-link>

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