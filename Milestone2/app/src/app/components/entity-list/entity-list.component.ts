import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entity } from '../../models/entity';
import { EntityRestService } from '../../services/entity-rest.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {
  entities: Entity[];

  // Declare as propriedades necessárias para filtragem
  loading: boolean = false;
  filters: any = {}; // Inicializa 'filters' como um objeto vazio
  error: boolean = false;

  displayedColumns: string[] = ['name', 'contact', 'email', 'description', 'address'];

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

  /*applyFilters(): void {
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
}
*/
}
