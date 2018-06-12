<template>
  <div class="driver">
  
    <div class="holder">
  
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>MRN</th>
          </tr>
        </thead>
  
        <tbody>
          <tr v-for="(data, index) in cargo" :key="index" @click="rowClicked(data)">
            <td>{{ data.mrn }}</td>
          </tr>
        </tbody>
  
      </table>
  
    </div>
  
    <!-- Detail Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ detailModalProps.firstname }} {{ detailModalProps.lastname }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
  
            <p><strong>MRN</strong></p>
            <p>{{ detailModalProps.mrn }}</p>
  
          </div>
  
          <div class="modal-footer">
            <a class="btn btn-warning" @click="giveToDriver()"><i class= "fa fa-edit"></i>Koppel aan chauffeur</a>
          </div>
  
        </div>
      </div>
    </div>
  
    <!-- No Connection Modal -->
    <div class="modal fade" id="noConnectionModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Connection error</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
  
            <p>Er kan geen verbinding worden gemaakt met de API.</p>
  
          </div>
  
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
  export default {
    name: 'Cargo',
    data() {
      return {
        showNotification: false,
        notificationText: '',
        detailModalProps: {
          mrn: ''
        },
        MRN: {
          MRN: ''
        },
        cargo: [],
        notificationSystem: {
          options: {
            success: {
              theme: 'dark',
              icon: 'fas fa-check-circle',
              position: 'topCenter',
              backgroundColor: '#28a745',
              progressBar: false,
              timeout: 2000,
            },
            error: {
              theme: 'dark',
              icon: 'fas fa-exclamation-circle',
              position: 'topCenter',
              backgroundColor: '#dc3545',
              progressBar: false,
              timeout: 2000,
            }
          }
        }
      }
    },
    methods: {
  
      rowClicked: function(data) {
        this.detailModalProps.mrn = data.mrn
  
        $("#detailModal").modal('show')
      },
  
      checkUserConnection: function() {
        if (!navigator.onLine) {
          this.$toast.show("De internetverbinding is verbroken", 'Oops!', this.notificationSystem.options.error)
        }
      },
  
      checkApiConnection: function() {
        this.$http.get('http://localhost:8081').then(function(response) {}).catch(function() {
          this.$toast.show("Response", 'Connectie verbroken!', this.notificationSystem.options.error)
        })
      },


    getAllMrns: function(){
         console.log('Started getAllMrns')
        this.cargo.splice(0, this.cargo.length)
        fetch('http://localhost:8081/customs/form/all/test')
            .then(data => data.json())
            .then(data =>{
                this.cargo = data.message
            })
            .catch(function(){
                $("#noConnectionModal").modal('show')
            })
    }
    },
    
  
    created: function() {
      this.getAllMrns()
    },
  
    mounted: function() {
      this.checkUserConnection()
      this.checkApiConnection()
    }
    
}
</script>

<style>
  .iziToast {
    margin-top: 60px;
    min-width: 400px;
  }
  
  .iziToast-wrapper-topCenter {
    margin-top: 50px;
  }
  
  table tbody tr {
    cursor: pointer;
  }
  
  .table .btn {
    margin-right: 5px;
  }
  
  .btn {
    color: #fff !important;
  }
  
  .table .btn i {
    color: #fefefe;
    padding: 0px;
  }
  
  .buttonCol {
    width: 25%;
  }
  
  .btn i {
    padding-right: 4px;
  }
  
  .card {
    margin-bottom: 10px;
  }
  
  .card-body {
    padding: 10px !important;
  }
</style>