<template>
  <div class="driver">
  
    <div class="holder">
  
      <div class="card">
        <div class="card-body">
          <a class="btn btn-primary" data-toggle="modal" data-target="#registerModal"><i class= "fas fa-user-plus"></i> Registreer</a>
        </div>
      </div>
  
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
            <a class="btn btn-warning"><i class= "fa fa-edit"></i> Bewerken</a>
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
          MRN: ''
        },
        driver: {
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
      handleSubmit: function() {
  
/*        var formData = {
          mrn: this.$refs.registration.firstname.value,
          lastname: this.$refs.registration.lastname.value,
          username: this.$refs.registration.username.value,
          password: this.$refs.registration.password.value,
          imei: this.$refs.registration.imei.value,
          passwordcheck: this.$refs.registration.passwordcheck.value
        }
  
        if (this.$refs.registration.passwordcheck.value != this.$refs.registration.password.value) {
          this.$toast.show('Wachtwoorden komen niet overeen', '', this.notificationSystem.options.error)
        } else {
  
          this.$http.post('http://localhost:8081/auth/register', formData).then(function(response) {
            if (response.body) {
              if (response.status == 200) {
                $('#registerModal').modal('hide')
                $('.modal').on('hidden.bs.modal', function() {
                  $(this).find('form')[0].reset();
                })
                this.showNotification = false
                this.$toast.show('Chauffeur is geregistereerd!', '', this.notificationSystem.options.success)
                this.getAllUsers()
              }
            } else {
              this.$toast.show('Er is iets misgegaan', '', this.notificationSystem.options.error)
            }
          }, function(response) {
            this.$toast.show(response.body.message, '', this.notificationSystem.options.error)
          })
  
        }
      } ,*/
  
/*      deleteUser: function(id) {
  
        console.log(id)
  
        var formData = {
          "userID": id
        }
  
        this.$http.delete('http://localhost:8081/admin/deleteuser', {
          body: formData
        }).then(function(response) {
          console.log(formData)
          if (response.body) {
            if (response.body.message == 'Succesfully deleted user') {
              $('#detailModal').modal('hide')
              this.$toast.show('Chauffeur is verwijderd', '', this.notificationSystem.options.success)
              this.getAllUsers()
            } else {
              this.$toast.show("Er is iets mis gegaan", 'Oops!', this.notificationSystem.options.error)
            }
          }
        })
      } ,*/
  
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
  
/*      getAllUsers: function() {
        this.cargo.splice(0, this.cargo.lensuccessgth)
        fetch('http://localhost:8081/admin/allusers')
          .then(data => data.json())
          .then(data => {
            this.cargo = data.message
          })
          .catch(function() {
            $("#noConnectionModal").modal('show')
          })
      }
    },*/
  
    created: function() {
      this.getAllUsers()
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