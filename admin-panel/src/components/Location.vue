<template>
  <div class="location">
  
    <div class="row h-100">
  
      <div class="col-4">
  
        <table id="mrnTable" class="table mrnTable table-bordered table-hover">
          <thead>
            <tr>
              <th>MRN</th>
              <th>Chauffeur</th>
            </tr>
          </thead>
  
          <tbody>
            <tr class="clickable-row" v-for="(data, index) in forms" :key="index" @click="rowClicked(data)">
              <td>{{ data.mrn }}</td>
              <td>{{ data.firstname }} {{ data.lastname }}</td>
            </tr>
          </tbody>
  
        </table>
  
        <table class="table pointerTable table-bordered table-striped">
          <thead>
            <tr>
              <th>Time</th>
              <th>Long</th>
              <th>Lat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in locations" :key="index">
              <td>{{ data.position.time }}</td>
              <td>{{ data.position.lng }}</td>
              <td>{{ data.position.lat }}</td>
            </tr>
          </tbody>
        </table>
  
      </div>
  
      <div class="col-8">
  
        <gmap-map :center="center" ref="map" :zoom="1" style="width:100%;  height: 95%;">
          <gmap-marker v-for="a in addresses" :position.sync="a.position" :clickable="true" :draggable="false " @g-click="center=a.position ">
          </gmap-marker>
          <gmap-marker v-for="m in locations" :position.sync="m.position" :clickable="true" :draggable="false " @g-click="center=m.position ">
          </gmap-marker>
        </gmap-map>
  
      </div>
  
    </div>
  
    <!-- No Connection Modal -->
    <div class="modal fade " id="noConnectionModal " tabindex="-1 " role="dialog ">
      <div class="modal-dialog " role="document ">
        <div class="modal-content ">
          <div class="modal-header ">
            <h5 class="modal-title ">Connection error</h5>
            <button type="button " class="close " data-dismiss="modal " aria-label="Close "></button>
          </div>
          <div class="modal-body ">
            <p>Er kan geen verbinding worden gemaakt met de API.</p>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: 'Location',
    data() {
      return {
        forms: [],
        locations: [],
        addresses: [],
        center: {
          lat: 0,
          lng: 0
        },
        mapPin: {
          url: '../assets/address-marker.svg',
        },
        form: {
          declarationID: '',
          mrn: '',
          declarationStatus: '',
          reference: '',
          dateTime: '',
          sender: '',
          receiver: '',
          client: '',
          articleAmount: '',
          totalAmount: '',
          currency: '',
          totalWeight: '',
          addressOrigin: '',
          addressDestination: '',
          customerID: ''
        },
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
  
        $('#mrnTable').on('click', '.clickable-row', function(event) {
          $(this).addClass('bg-selected').siblings().removeClass('bg-selected');
        });
  
        var selectedMRN = data.mrn
  
        fetch('http://localhost:8080/customs/form/' + selectedMRN)
          .then(formData => formData.json())
          .then(formData => {
  
            let addressArray = []
            let tempArray = []
  
            let origin = formData.message.addressOrigin
            let destination = formData.message.addressDestination
  
            addressArray.push(origin)
            addressArray.push(destination)
  
            let geocoder = new google.maps.Geocoder()
  
            addressArray.forEach(function(obj) {
  
              // Get Lat and Long
              geocoder.geocode({
                'address': obj
              }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
  
                  var latitude = results[0].geometry.location.lat()
                  var longitude = results[0].geometry.location.lng()
  
                  // Create new object from array items
                  var location = {
                    "position": {
                      "lng": longitude,
                      "lat": latitude,
                    }
                  }
  
                  // Add them to temporary array
                  tempArray.push(location)
  
                }
              })
            })
            this.addresses = tempArray
          })
  
        fetch('http://localhost:8080/location/get/' + selectedMRN)
          .then(data => data.json())
          .then(data => {
  
            // Temporary Array
            var tempArray = []
            var dataArray = data.message
  
            dataArray.forEach(function(obj) {
  
              // Create new object from array items
              var location = {
                "position": {
                  "time": obj.dateTime,
                  "lng": obj.long,
                  "lat": obj.lat,
                }
              }
  
              // Add them to temporary array
              tempArray.push(location)
  
            })
  
            this.locations = tempArray
  
            var bounds = new google.maps.LatLngBounds()
  
            // this.addresses.forEach((marker) => {
            //   bounds.extend(new google.maps.LatLng(marker.position.lat, marker.position.lng))
            // })
  
  
  
            this.locations.forEach((marker) => {
              bounds.extend(new google.maps.LatLng(marker.position.lat, marker.position.lng))
            })
            
            this.$refs.map.fitBounds(bounds)

          })
          .catch(function() {
            $("#noConnectionModal").modal('show')
          })
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
  
      getAllMRNS: function() {
        fetch('http://localhost:8080/company/forms')
          .then(data => data.json())
          .then(data => {
            this.forms = data.message
          })
          .catch(function() {
            $("#noConnectionModal").modal('show')
          })
      }
    },
  
    created: function() {
      this.getAllMRNS()
    },
  
    mounted: function() {
      this.checkUserConnection()
      this.checkApiConnection()
    },
  
    ready: function() {}
  }
</script>

<style>
  html {
    height: 89%;
  }
  
  body,
  #app,
  .container-fluid,
  .location {
    height: 100%;
  }
  
  .bg-selected {
    background-color: #dbd8d8;
  }
  
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
  
  .pointerTable tbody tr {
    cursor: default !important;
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