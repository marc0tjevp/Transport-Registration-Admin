<template>
  <div class="cargo">
  
    <div class="holder">
  
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>MRN</th>
            <th>Referentie</th>
            <th>Verzender</th>
            <th>Ontvanger</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in cargo" :key="index" @click="rowClicked(data)+ checkIfSigned(data)">
            <td>{{ data.mrn }}</td>
            <td>{{ data.reference }}</td>
            <td>{{ data.sender }}</td>
            <td>{{ data.client }}</td>
          </tr>
        </tbody>
      </table>
  
    </div>
  
    <!-- Detail Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Vracht: {{ detailModalProps.mrn }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
  
            <p><strong>MRN</strong></p>
            <p>{{ detailModalProps.mrn }}</p>
  
            <p v-if="takenID.driverid"><strong>Toegewezen aan</strong></p>
            <p v-if="takenID.driverid">{{ takenID.driverid }}</p>
          </div>
  
          <div v-if="!takenID.driverid" class="modal-footer">
            <a class="btn btn-warning" @click="openAddModal()"><i class= "fa fa-edit"></i>Koppel aan chauffeur</a>
          </div>
  
          <div v-if="takenID.driverid" class="modal-footer">
            <a class="btn btn-danger" @click="openRemoveModal(takenID.driverid, detailModalProps.mrn)"><i class= "fa fa-edit"></i>Ontkoppel chauffeur</a>
          </div>
  
        </div>
      </div>
    </div>
  
    <!-- Add to driver Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Koppel aan chauffeur</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
  
            <p><strong>MRN</strong></p>
            <p>{{ detailModalProps.mrn }}</p>
  
            <div class="form-group">
              <select class="form-control" v-model="selected">
                                  <option v-for="(driverDataz, index) in drivers" :key="index" v-bind:value="driverDataz.driverID">
                                    {{driverDataz.firstname}} {{ driverDataz.lastname }}
                                  </option>
                                </select>
            </div>
  
          </div>
  
          <div class="modal-footer">
            <a class="btn btn-warning" @click="giveToDriver(selected)"><i class= "fa fa-edit"></i>Voeg toe</a>
          </div>
  
        </div>
      </div>
    </div>
  
    <!-- Remove from driver Modal -->
    <div class="modal fade" id="removeModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ontkoppel vracht?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <form @submit.prevent="handleSubmitRemove" ref="remove">
            <div class="modal-body">
              <input id="userID" v-model="removeModalProps.driverID" name="driverID" required="required" class="form-control here" type="text">
              <input id="userID" v-model="removeModalProps.mrn" name="mrn" required="required" class="form-control here" type="text">
            </div>
  
            <div class="modal-footer">
              <button name="submit" type="submit" class="btn btn-primary">Ontkopel</button>
              <a class="btn btn-secondary" data-dismiss="modal">Annuleren</a>
            </div>
          </form>
  
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
        selected: null,
        showNotification: false,
        notificationText: '',
        addModalProps: {
          driverid: ''
        },
        detailModalProps: {
          mrn: ''
        },
        removeModalProps: {
          mrn: '',
          driverid: ''
        },
        MRN: {
          MRN: ''
        },
        takenID: {
          driverid: ''
        },
        cargo: [],
        drivers: [],
        signedMrns: [],
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
        this.$http.get('http://localhost:8080').then(function(response) {}).catch(function() {
          this.$toast.show("Response", 'Connectie verbroken!', this.notificationSystem.options.error)
        })
      },
  
      getAllMrns: function() {
        this.cargo.splice(0, this.cargo.length)
        fetch('http://localhost:8080/customs/form/all/test')
          .then(data => data.json())
          .then(data => {
            this.cargo = data.message
          })
          .catch(function() {
            $("#noConnectionModal").modal('show')
          })
      },
  
      getRegisteredMrns: function() {
        this.signedMrns.splice(0, this.signedMrns.length)
        fetch('http://localhost:8080/company/forms')
          .then(mrnData => mrnData.json())
          .then(mrnData => {
            this.signedMrns = mrnData.message
          })
      },
  
      checkIfSigned: function(param) {
        for (var i = 0; i < this.signedMrns.length; i++) {
          var tempArray = this.signedMrns[i]
          if (param.mrn == tempArray.mrn) {
            this.takenID.driverid = tempArray.driverID
            break
          } else {
            this.takenID.driverid = ''
          }
        }
      },
  
      getAllDrivers: function() {
        this.drivers.splice(0, this.drivers.length)
        fetch('http://localhost:8080/admin/allusers')
          .then(driverData => driverData.json())
          .then(driverData => {
            this.drivers = driverData.message
          })
          .catch(function() {
            $("#noConnectionModal").modal('show')
          })
      },
  
      openAddModal: function() {
        $("#addModal").modal('show')
      },
  
      openAddModal: function() {
        $("#addModal").modal('show')
      },
  
      handleSubmitRemove: function() {
        var formData = {
          driverID: this.$refs.remove.driverID.value,
          mrn: this.$refs.remove.mrn.value,
        }
  
        this.$http.delete('http://localhost:8080/company/driver/deregister', {
          body: formData
        }).then(function(response) {
          if (response.body) {
            if (response.status == 200) {
              $('#removeModal').modal('hide')
              this.$toast.show('Chauffeur is ontkoppeld', '', this.notificationSystem.options.success)
            } else {
              this.$toast.show("Er is iets mis gegaan", 'Oops!', this.notificationSystem.options.error)
            }
          }
        }).catch(function() {
          this.$toast.show(response.message, '', this.notificationSystem.options.error)
        })
      },
  
      openRemoveModal: function(id, mrn) {
  
        this.removeModalProps.driverID = id
        this.removeModalProps.mrn = mrn
  
        $("#removeModal").modal('show')
      },
  
      giveToDriver: function(param) {
        this.addModalProps.driverid = param
        //driverID + mrn
        var formData = {
          driverID: param,
          mrn: this.detailModalProps.mrn
        }
        this.$http.post('http://localhost:8080/company/driver/register', formData)
          .then(function(resp) {
            if (resp.body) {
              if (resp.status == 200) {
                $('#addModal').modal('hide')
                this.showNotification = false
                this.$toast.show('Chauffeur is gekoppeld!', '', this.notificationSystem.options.success)
                this.getRegisteredMrns()
              } else {
                this.$toast.show('Er is iets misgegaan', '', this.notificationSystem.options.error)
              }
            }
          })
      }
    },
  
    created: function() {
      this.getAllMrns()
      this.getAllDrivers()
      this.getRegisteredMrns()
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