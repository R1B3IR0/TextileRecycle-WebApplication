import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entity } from '../../models/entity';
import { EntityRestService } from '../../services/entity-rest.service';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {
  entities: Entity[];

  constructor(private entityService: EntityRestService, private router: Router, private route: ActivatedRoute) {
    this.entities = [];
   }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this.entityService.getEntities().subscribe((data: Entity[]) => {
      console.log(data);
      this.entities = data;
    });
  }

  /*
  loading: boolean = false;
  filters: any; // Declare the 'filters' property
  error: boolean = false;

  applyFilters(): void {
    this.loading = true;
    this.entityService.getEntitiesFiltered(this.filters).subscribe(
      (data: Entity[]) => {
        this.entities = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching filtered entities:', error);
        this.error = true;
        this.loading = false;
      }
    );
  }
  */
}
