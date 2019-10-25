import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  titlePage: string;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
    ) {
    this.getDataRoute();
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild == null),
      map((event: ActivationEnd) => event.snapshot.data)
    ).subscribe(event => {
      console.log(event);
      this.titlePage = event.title;
      this.title.setTitle(event.title);

      // Agregar metaTag a la pagina.
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titlePage
      };

      this.meta.updateTag(metaTag);

    });
  }

}
