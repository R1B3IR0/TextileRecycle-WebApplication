import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Entity } from '../../models/entity';
import { EntityRestService } from '../../services/entity-rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})

export class EntityListComponent implements OnInit, AfterViewInit {
  entities: Entity[] = [];
  dataSource: MatTableDataSource<Entity> = new MatTableDataSource<Entity>([]);
  loading: boolean = false;
  error: boolean = false;
  displayedColumns: string[] = ['name', 'contact', 'email', 'description', 'addressLocality'];
  selectedFilter: string = '';
  filterValue: string = '';
  filterControl = new FormControl();
  private entitiesSubscription: Subscription | undefined;

  // Define filters
  filters = [
    { label: 'Name', value: 'name' },
    { label: 'Contact', value: 'contact' },
    { label: 'Email', value: 'email' },
    { label: 'Description', value: 'description' },
    { label: 'Locality', value: 'address.addressLocality' }
  ];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private entityService: EntityRestService) {}

  ngOnInit(): void {
    this.getEntities();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.entitiesSubscription) {
      this.entitiesSubscription.unsubscribe();
    }
  }

  getEntities(): void {
    this.loading = true;
    this.entityService.getEntities().subscribe(
      (data: Entity[]) => {
        this.entities = data;
        this.dataSource.data = this.entities;
        this.loading = false;
        this.error = false; // Clear error if request is successful
        this.dataSource.sort = this.sort; // Set sort after data is set
      },
      error => {
        console.error('Error fetching entities:', error);
        this.dataSource.data = [];
        this.loading = false;
        this.error = true;
      }
    );
  }

  applyFilter(filterValue: string): void {
    this.filterValue = filterValue.trim().toLowerCase();
    if (this.selectedFilter) {
      this.dataSource.filterPredicate = (data: Entity, filter: string) => {
        const fieldValue = this.getFieldValue(data, this.selectedFilter);
        return fieldValue.toLowerCase().includes(filter);
      };
    }
    this.dataSource.filter = this.filterValue;
  }

  getFieldValue(entity: Entity, filter: string): string {
    const fields = filter.split('.');
    let fieldValue: any = entity;
    for (const field of fields) {
      fieldValue = fieldValue[field];
      if (fieldValue === undefined || fieldValue === null) {
        return '';
      }
    }
    return String(fieldValue);
  }
}
