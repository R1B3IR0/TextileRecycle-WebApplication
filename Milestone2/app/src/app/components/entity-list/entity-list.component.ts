import { Component, OnInit } from '@angular/core';
import { Entity } from '../../models/entity';
import { EntityRestService } from '../../services/entity-rest.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {
  entities: Entity[] = [];
  dataSource: MatTableDataSource<Entity> = new MatTableDataSource<Entity>([]);
  loading: boolean = false;
  error: boolean = false;
  displayedColumns: string[] = ['name', 'contact', 'email', 'description', 'address'];
  selectedFilter: string = '';

  // Defina os filtros
  filters = [
    { label: 'Name', value: 'name' },
    { label: 'Contact', value: 'contact' },
    { label: 'Email', value: 'email' },
    { label: 'Description', value: 'description' },
    { label: 'Locality', value: 'address.addressLocality' }
  ];

  constructor(private entityService: EntityRestService) {}

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this.loading = true;
    this.entityService.getEntities().subscribe(
      (data: Entity[]) => {
        this.entities = data;
        this.dataSource = new MatTableDataSource(this.entities);
        this.loading = false;
        this.error = false; // Limpar erro se a solicitação for bem-sucedida
      },
      error => {
        console.error('Error fetching entities:', error);
        this.dataSource = new MatTableDataSource<Entity>([]);
        this.loading = false;
        this.error = true;
      }
    );
  }

 
  
}
