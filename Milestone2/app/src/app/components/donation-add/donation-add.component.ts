import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Donation, TypeOfClothing } from '../../models/donation';
import { DonationRestService } from '../../services/donation-rest.service';
import { DonatorRestService } from '../../services/donator-rest.service';
import { EntityRestService } from '../../services/entity-rest.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import * as L from 'leaflet';


@Component({
  selector: 'app-donation-add',
  templateUrl: './donation-add.component.html',
  styleUrls: ['./donation-add.component.css']
})
export class DonationAddComponent implements OnInit {
  newDonation: Donation = new Donation();
  donators: any[] = [];  // Replace with appropriate type
  entities: any[] = [];  // Replace with appropriate type
  public payPalConfig ? : IPayPalConfig;
  showSuccess = false;
  showMap: boolean = false;
  markersLayer: any;
  map: any;



  constructor(private router: Router, 
    private donationService : DonationRestService, 
    private donatorService: DonatorRestService, 
    private entityService: EntityRestService) {
    this.newDonation.typeOfClothing = [new TypeOfClothing()]

   }

  ngOnInit(): void {
    this.loadDonators();
    this.loadEntities();
    this.initConfig();
    this.initMap();

    
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'Aam9--W1eErGEHOOk4QgvOdxkLpkECTs3J88-4aNvl7SeANFiLl0rg3c52NV5usNfnyS16zBB2r01hVw', // seu clientId
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              value: '1000',
              currency_code: 'EUR',
            },
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal',
        fundingicons: false,
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);

          // Create a donation object with the required data
          var donationData = {
            donator: (document.getElementById('donator') as HTMLInputElement).value,
            entity: (document.getElementById('entity') as HTMLInputElement).value,
            donationDate: (document.getElementById('donationDate') as HTMLInputElement).value,
            typeOfDonation: (document.getElementById('typeOfDonation') as HTMLInputElement).value,
            amount: (document.getElementById('amount') as HTMLInputElement).value
          };

          // Send an HTTP POST request to the server to create the donation
          fetch('/donations/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(donationData)
          })
            .then(response => {
              if (response.ok) {
                console.log('Donation created successfully.');
                // Redirect to the donations page
                window.location.href = '/donations';
              } else {
                throw new Error('Failed to create donation.');
              }
            })
            .catch(error => {
              console.error('Error creating donation:', error);
            });
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
      onInit: (data, actions) => {
        actions.enable();
      }
    };
  }

  loadDonators() {
    this.donatorService.getDonators().subscribe(
      (data) => {
        this.donators = data;
      },
      (error) => {
        console.error('Error loading donators', error);
      }
    );
  }

  loadEntities() {
    this.entityService.getEntities().subscribe(
      (data) => {
        this.entities = data;
      },
      (error) => {
        console.error('Error loading entities', error);
      }
    );
  }

  addDonation() {
    if (!this.newDonation.typeOfClothing || this.newDonation.typeOfClothing.length === 0) {
      alert('A doação deve ter pelo menos um item.');
      return;
    }

    this.donationService.addDonation(this.newDonation).subscribe(
      (donation) => {
        console.log('Donation added', donation);
        this.router.navigate(['/donation-list']);
      },
      (error) => {
        console.error('Error adding donation', error);
      }
    );
  }
  
  addClothingItem() {
    this.newDonation.typeOfClothing?.push(new TypeOfClothing());
  }

  removeClothingItem(index: number) {
    if (this.newDonation.typeOfClothing!.length > 1) {
      this.newDonation.typeOfClothing?.splice(index, 1);
    }
  }


  onTypeOfDonationChange(event: any) {
    const type = event.target.value;
    this.showMap = (type === 'Doação Têxtil');
    const mapElement = document.getElementById('map');

    if (type === 'Doação Têxtil') {
      document.getElementById('typeOfClothingDiv')!.style.display = 'block';
      document.getElementById('warehouseNameGroup')!.style.display = 'block';
      document.getElementById('submitButton')!.style.display = 'block';

      // Mostrar componente do mapa apenas se o elemento existir
      if (mapElement) {
        mapElement.style.display = 'block';
      }

      document.getElementById('amountDiv')!.style.display = 'none';
    } else if (type === 'Dinheiro') {
      document.getElementById('typeOfClothingDiv')!.style.display = 'none';
      document.getElementById('warehouseNameGroup')!.style.display = 'none';
      document.getElementById('submitButton')!.style.display = 'none';

      // Ocultar componente do mapa apenas se o elemento existir
      if (mapElement) {
        mapElement.style.display = 'none';
      }

      document.getElementById('amountDiv')!.style.display = 'block';
    } else {
      document.getElementById('typeOfClothingDiv')!.style.display = 'none';
      document.getElementById('warehouseNameGroup')!.style.display = 'none';
      document.getElementById('amountDiv')!.style.display = 'none';
      document.getElementById('submitButton')!.style.display = 'none';

      // Ocultar componente do mapa apenas se o elemento existir
      if (mapElement) {
        mapElement.style.display = 'none';
      }
    }
  }

  private async initMap() {
    this.map = L.map('map').setView([41.364546, -8.19918], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Click event to get the coordinates
    this.map.on('click', (event: any) => {
      alert(`You clicked the map at: ${event.latlng}`);
    });
  
    await this.loadGeoJson();

    // Add markers to the map
    await this.addMarkersToMap();
  }

  private async loadGeoJson() {
    try {
      const request = await fetch("assets/geoJson/felgueiras.geojson");
      const response = await request.json();
      L.geoJSON(response).addTo(this.map);
      console.log('GeoJson carregado com sucesso');
    } catch (error) {
      console.error('Error loading GeoJSON data:', error);
    }
  }

  private async getLocations() {
    try {
      const response = await fetch('assets/locationsJson/locations.json');
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados JSON.');
      }
      const data = await response.json();
      return data.locations;
    } catch (error) {
      console.error('Erro ao carregar os dados JSON:', error);
      return [];
    }
  }

  private async addMarkersToMap() {
    try {
      this.markersLayer = L.layerGroup().addTo(this.map);

      const locations = await this.getLocations();

      locations.forEach((location: any) => {
        if (location.place && location.place.geo && location.place.geo.latitude && location.place.geo.longitude) {
          const customIcon = L.icon({
            iconUrl: 'https://img.icons8.com/?size=512&id=EUzdsWR7Aq6o&format=png',
            iconSize: [30, 30]
          });
          const marker = L.marker([location.place.geo.latitude, location.place.geo.longitude], { icon: customIcon });
          const popupContent = `
            <b>${location.name}</b><br>
            ${location.place.address.streetAddress}, ${location.place.address.addressLocality}, ${location.place.address.postalCode}
          `;
          marker.bindPopup(popupContent);

          marker.on('click', () => {
            (document.getElementById('warehouseName') as HTMLInputElement).value = location.name;
            this.newDonation.warehouseName = location.name;
          });

          this.markersLayer.addLayer(marker);
        }
      });
    } catch (error) {
      console.error('Error adding markers to map:', error);
    }
  }

  
  
}
