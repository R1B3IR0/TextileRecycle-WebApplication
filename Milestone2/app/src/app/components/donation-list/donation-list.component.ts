import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../../models/donation';
import { UserRestService } from '../../services/user-rest.service';


@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {
  donations: Donation[];
  displayedColumns: string[] = ['_id', 'donatorName', 'donationDate', 'typeOfDonation', 'status', 'points'];
  
  constructor(private userRestService: UserRestService, private router: Router, private route: ActivatedRoute) {
    this.donations = [];
  }

  ngOnInit(): void {
    this.getDonations();
  }

  getDonations(): void {
    this.userRestService.getDonations().subscribe((data: Donation[]) => {
      console.log(data);
      this.donations = data;
    }, (error) => {
      console.log(error);
    });
  }
}
