import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { Http } from "@angular/http"
import { ConfigurationService } from "../../services/configuration"
import { Configuration } from "../../models/configuration"
import { Observable } from "rxjs/Observable"

@Component({
  selector: "admin-form",
  templateUrl: "./admin-form.component.html"
})
export class AdminForm implements OnInit {
  model: Configuration
  submitted = false

  constructor(
    private route: ActivatedRoute,
    private configurationService: ConfigurationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.configurationService.configuration.subscribe(config => {
      this.model = config
    })
  }

  onSubmit(e) {
    this.submitted = true
    this.configurationService.saveConfig(this.model).subscribe(response => {
      console.log(response)
      this.router.navigate(["/"])
    })
  }
}
