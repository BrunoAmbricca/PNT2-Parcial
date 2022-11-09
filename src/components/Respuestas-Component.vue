<template lang="html">

  <section class="respuestas-component">
    <div class="jumbotron">
      <h2>Respuestas</h2>
      <hr>
      <br>
      <div class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Numero</th>
            <th>Respuesta</th>
          </tr>
          <tr v-for="(respuesta,index) in preguntas" :key="index">
            <td>{{ respuesta.numero }}</td>
            <td>{{ respuesta.respuestas }}</td>
          </tr>
        </table>
      </div>

    </div>
  </section>

</template>

<script>

  export default  {
    name: 'respuestas-component',
    props: [],
    mounted () {

    },
    data () {
      return {
        preguntas: [
          {numero: 1, respuestas: ["B", "D"]},
          {numero: 2, respuestas: ["C"]},
          {numero: 3, respuestas: ["E"]}
        ]
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .respuestas-component {

  }
</style>
