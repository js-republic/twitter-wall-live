import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Tweet } from "../models/tweet"
import { Observable } from "rxjs/Observable"
import { Configuration } from "../models/configuration"
import "rxjs/add/operator/map"

@Injectable()
export class ConfigurationService {
  configuration: Observable<Configuration>
  constructor(private http: Http) {
    this.configuration = http
      .get("/api/configuration")
      .map(res => res.json())
      .map(Configuration.fromJSON)
  }

  saveConfig(config: Configuration): Observable<Response> {
    return this.http.put("/api/configuration", config)
  }
}
