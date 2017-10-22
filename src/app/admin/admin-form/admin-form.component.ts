import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Configuration } from '../../models/configuration'
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'admin-form',
  templateUrl: './admin-form.component.html'
})
export default class AdminForm implements OnInit {
  model: Configuration;
  submitted = false;

  constructor(private configurationService: ConfigurationService,
              private router: Router) {
  }

  ngOnInit() {
    this.configurationService.get().subscribe(config => {
      this.model = config;
    })
  }

  onSubmit() {
    this.submitted = true;
    this.configurationService.save(this.model).subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    });
  }
}
