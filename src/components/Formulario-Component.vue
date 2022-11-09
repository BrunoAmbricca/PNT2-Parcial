<template>

  <section class="formulario-component">
    <div class="jumbotron">
      <h2>Ingreso de Gastos</h2>
      <hr>

      <vue-form :state="formstate" @submit.prevent="enviar()">
        
        <!-- Campo nombre -->
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" 
            v-model="formData.nombre" 
            :minlength="nombreMinLength"
            :maxlength="nombreMaxLength" 
            required name="nombre" 
            autocomplete="off" 
            @keydown.space.prevent
            class="form-control" />
    
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
          </field-messages>
        </validate>
        <br>

        <!-- Campo Descripcion -->
        <validate tag="div">
          <label for="descripcion">Descripcion</label>
          <input type="text" id="descripcion" v-model="formData.descripcion" required name="descripcion" autocomplete="off" class="form-control" />
    
          <field-messages name="descripcion" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos {{nombreMinLength}} caracteres.
            </div>
            <div slot="maxlength" class="alert alert-danger mt-1">
              Este campo debe poseer como maximo {{nombreMaxLength}} caracteres.
            </div>
          </field-messages>
        </validate>
        <br>
        
        <!-- Campo importe -->
        <validate tag="div">
          <label for="importe">Importe</label>
          <input type="number" id="importe" v-model.number="formData.importe" required name="importe" autocomplete="off" class="form-control" />
    
          <field-messages name="importe" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
          </field-messages>
        </validate>

        <br>

        <button class="btn btn-success my-3" :disabled="formstate.$invalid" type="submit">Enviar</button>
      </vue-form>
      <br>
      <hr>

      <!-- Tabla para representar los datos ingresados -->
      <h2>Detalle de Gastos</h2>
      <br>

      <div v-if="gastos.length" class="table-responsive">
        <label for="presupuesto">Presupuesto</label>
        <input type="number" id="presupuesto" @input="getTotalGastosColor()" v-model.number="presupuesto" required name="presupuesto" autocomplete="off" class="form-control" />
        
        <hr>
        
        <table class="table table-dark">
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>importe</th>
            <th>Fecha</th>
          </tr>
          <tr v-for="(gasto,index) in gastos" :key="index">
            <td>{{ gasto.nombre }}</td>
            <td>{{ gasto.descripcion }}</td>
            <td>${{ gasto.importe }}</td>
            <td>{{ gasto.fecha }}</td>
          </tr>
          <tr :style="{color: totalGastosColor }">
            <td></td>
            <td>TOTAL:</td>
            <td>${{ totalGastos }}</td>
          </tr>
        </table>
      </div>
      <h3 v-else class="alert alert-info">No hay gastos ingresados</h3>

    </div>
  </section>

</template>

<script>

  export default  {
    name: 'formulario-component',
    props: [],
    mounted () {

    },
    data () {
      return {
        formstate : {},
        formData : this.getInitialData(),
        gastos : [],
        totalGastos: 0,
        totalGastosColor: '',
        nombreMinLength: 3,
        nombreMaxLength: 15,
        presupuesto: ''
      }
    },
    methods: {
      getInitialData() {
        return {
          nombre : null,
          descripcion: null,
          importe: null,
        }
      },
      enviar() {
        let gasto = {...this.formData}
        gasto.fecha = new Date().toLocaleString()

        this.gastos.push(gasto)

        this.getTotalGastos(gasto)

        this.formData = this.getInitialData()
        this.formstate._reset()
      },
      getTotalGastos(gasto){

        this.totalGastos = this.totalGastos + gasto.importe
        this.getTotalGastosColor()
                
      },
      getTotalGastosColor(){
        let color = 'green'
        if(this.totalGastos > 1000 && this.totalGastos < 5000) color = 'magenta'
        if(this.totalGastos > 5000) color = 'orange'

        if(String(this.presupuesto).length > 0 && this.presupuesto < this.totalGastos) color = 'red'

        this.totalGastosColor = color
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .jumbotron {
    background-color: lightgrey;
  }

  hr {
    background-color: #eee;
  }

  pre {
    color: white;
  }
</style>
