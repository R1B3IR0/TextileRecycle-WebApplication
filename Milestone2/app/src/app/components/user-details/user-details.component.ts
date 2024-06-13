import { Component, OnInit } from '@angular/core';
import { UserRestService } from '../../services/user-rest.service';

interface Voucher {
  description: string;
  value: number;
  pointsRequired: number;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any = {};
  points: number | undefined = 0;
  //selectedVoucher: Voucher | null = null;
  /*
  vouchers: Voucher[] = [
    { description: 'Voucher 10 euros', value: 10, pointsRequired: 100 },
    { description: 'Voucher 25 euros', value: 25, pointsRequired: 250 },
    { description: 'Voucher 50 euros', value: 50, pointsRequired: 500 }
  ];
*/
  //displayedColumns: string[] = ['description', 'value', 'select'];

  constructor(private userService: UserRestService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getUserPoints();
  }

  getUserDetails(): void {
    this.userService.getDonator().subscribe(
      data => this.user = data,
      error => console.error('Error fetching user details', error)
    );
  }

  getUserPoints(): void {
    this.userService.getPoints().subscribe(
      data => this.points = data.points,
      error => console.error('Error fetching user points', error)
    );
  }
/*
  selectVoucher(voucher: Voucher): void {
    this.selectedVoucher = voucher;
  }

  exchangePointsForVoucher(): void {
    if (this.selectedVoucher && this.points && this.points >= this.selectedVoucher.pointsRequired) {
      // Aqui você pode implementar a lógica para trocar pontos pelo voucher
      console.log(`Trocar ${this.selectedVoucher.value} euros pelo voucher ${this.selectedVoucher.description}`);

      // Exemplo simplificado: diminuir os pontos do usuário
      this.points -= this.selectedVoucher.pointsRequired;
    } else {
      console.error('Pontos insuficientes ou nenhum voucher selecionado.');
    }
  }
  */
}
