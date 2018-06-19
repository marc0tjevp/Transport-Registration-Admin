<template>
  <div class="driver">
  
    <div class="holder">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Achternaam</th>
            <th>Gebruikersnaam</th>
          </tr>
        </thead>
  
        <tbody>
          <tr v-for="(data, index) in drivetimes" :key="index" @click="rowClicked(data) + getMrnByID(data.driverID)">
            <td>{{ data.firstname }}</td>
            <td>{{ data.lastname }}</td>
            <td>{{ data.username }}</td>
          </tr>
        </tbody>
  
      </table>
  
    </div>
  
    <!-- Detail Modal -->
    <div class="modal fade" ref="detailModal" id="detailModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ detailModalProps.firstname }} {{ detailModalProps.lastname }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div v-if="mrnID.length > 0" class="modal-body">
  
            <form>
              <div class="form-group">
                <label for="cargo">Selecteer een vracht</label>
                <select class="form-control" name="cargo" v-model="selected" @change="getDrivetimeByMrn(selected)">
                        <option v-for="(driverData, index) in mrnID" :key="index" >{{driverData.mrn}}</option>
                      </select>
              </div>
            </form>
  
            <table v-if="drivesByMrn.length > 0" class="table table-striped table-bordered">
              <thead>
                <th>Startijd</th>
                <th>Eindtijd</th>
                <th>Type</th>
              </thead>
              <tbody>
                <tr v-for="(datat, index) in drivesByMrn" :key="index">
                  <td>{{ datat.startTime }} </td>
                  <td>{{ datat.endTime }} </td>
                  <td>{{ datat.type }} </td>
                </tr>
              </tbody>
            </table>
  
            <div v-else>
              <div v-if="selected">
                <p>Er zijn geen rijtijden voor deze vracht</p>
              </div>
            </div>
            
          </div>
  
          <div v-else class="modal-body">
            <p>Geen beschikbare vrachten voor deze chauffeur</p>
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
    name: 'Drivetimes',
    data() {
      return {
        selected: null,
        showNotification: false,
        notificationText: '',
        detailModalProps: {
          mrn: '',
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          drivetimes: '',
          imei: ''
        },
  
        drivetimes: [],
        mrnID: [],
        drivesByMrn: [],
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
  
        $('form').find('input[type=select], select').val('')
        this.selected = ''
        this.drivesByMrn.splice(0, this.drivesByMrn.length)
  
        this.detailModalProps.mrn = data.mrn
        this.detailModalProps.firstname = data.firstname
        this.detailModalProps.lastname = data.lastname
        this.detailModalProps.username = data.username
        this.detailModalProps.imei = data.imei
  
        $("#detailModal").modal('show')
      },
  
      checkUserConnection: function() {
        if (!navigator.onLine) {
          this.$toast.show("De internetverbinding is verbroken", 'Oops!', this.notificationSystem.options.error)
        }
      },
  
      checkApiConnection: function() {
        this.$http.get('http://localhost:8080').then(function(response) {}).catch(function() {
          this.$toast.show("Response", 'Connectie verbroken!', this.notificationSystem.options.error)
        })
      },
  
      getAllDrivers: function() {
        this.drivetimes.splice(0, this.drivetimes.length)
        fetch('http://localhost:8080/admin/allUsers')
          .then(data => data.json())
          .then(data => {
            this.drivetimes = data.message
          })
          .catch(function() {
            $("#noConnectionModal").modal('show')
          })
      },
  
      getMrnByID: function(paramOne) {
        this.mrnID.splice(0, this.mrnID.length)
        fetch('http://localhost:8080/company/getbyid/' + paramOne)
          .then(mrnData => mrnData.json())
          .then(mrnData => {
            this.mrnID = mrnData.message
          })
      },
  
      getDrivetimeByMrn: function(paramtwo) {
        fetch('http://localhost:8080/drivetimes/getdrivebymrn/' + paramtwo)
          .then(mrnData => mrnData.json())
          .then(mrnData => {
            if (Array.isArray(mrnData.message)) {
              this.drivesByMrn = mrnData.message
            } else {
              this.drivesByMrn = []
            }
            console.log(mrnData.message)
          })
      }
    },
  
    created: function() {
      this.getAllDrivers()
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