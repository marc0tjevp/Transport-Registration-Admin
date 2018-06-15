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
          <tr v-for="(data, index) in drivetimes" :key="index" @click="rowClicked(data)">
            <td>{{ data.firstname }}</td>
            <td>{{ data.lastname }}</td>
            <td>{{ data.username }}</td>
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
  
            <p><strong>mrn</strong></p>
            <p>{{ detailModalProps.mrn }}</p>

            <p><strong>Voornaam</strong></p>
            <p>{{ detailModalProps.firstname }}</p>
  
            <p><strong>Achternaam</strong></p>
            <p>{{ detailModalProps.lastname }}</p>
  
            <p><strong>Gebruikersnaam</strong></p>
            <p>{{ detailModalProps.username }}</p>
  
            <p><strong>locatie</strong></p>
            <p>{{ detailModalProps.location }}</p>

            <p><strong>rit tijden</strong></p>
            <p>{{ detailModalProps.drivetimes }}</p>

            <p><strong>Android ID</strong></p>
            <p>{{ detailModalProps.imei }}</p>
  
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
        showNotification: false,
        notificationText: '',
        detailModalProps: {
          mrn: '',
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          location: '',
          drivetimes: '',
          imei: ''
        },

        drivetimes: [],
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
        this.drivetimes.splice(0, this.drivetimes.lensuccessgth)
        fetch('http://localhost:8080/admin/allUsers')
          .then(data => data.json())
          .then(data => {
            this.drivetimes = data.message
          })
          .catch(function() {
            $("#noConnectionModal").modal('show')
          })
      }
    },

      getAllMrns: function() {
        console.log('Started getAllMrns')
        this.mrn.splice(0, this.mrn.length)
        fetch('http://localhost:8080/customs/form/all/test')
          .then(data => data.json())
          .then(data => {
            this.mrn = data.message
          })
          .catch(function() {
            $("#noConnectionModal").modal('show')
          })
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