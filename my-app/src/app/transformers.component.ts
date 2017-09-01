import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Transformer } from './model/Transformer';
import { TransformerService } from './transformer.service';
import { Faction } from "./model/Faction";


@Component({
  selector: 'my-transformers',
  templateUrl:'./transformers.component.html',
  styleUrls: [ './transformers.component.css' ],
})

export class TransformersComponent implements OnInit{

  transformers: Transformer[];
  selectedTransformer: Transformer;
  factions: Faction[];
  newTransf: Transformer[];
  filterByFactions: Transformer[];

  constructor(
    private router: Router,
    private transformerService: TransformerService) {}

  getTransformers(): void {
    this.transformerService.getTransformers()
      .then(transformers => 
        this.transformers = transformers
      ); 
  }

  getFactions(): void {
    this.transformerService.getFactions()
      .then(factions => {
        //console.log(factions);
        return this.factions = factions;
      });
  }

  ngOnInit(): void {
    this.getTransformers();
    this.getFactions();
    //console.log(this.getFactions());
  }
  
  filterTransformers(transformers: Transformer[], term: string, selectedFaction: string): Transformer[] {
    //debugger;
    /*Napisati funkcije filterByFactions() i filterByTerm() te ih pozvati umjesto ove tone koda*/
    if (term === undefined && (selectedFaction === undefined || selectedFaction === '-')) {
      return this.transformers;
    } else if (selectedFaction !== undefined){
      if(selectedFaction === 'Autobots' && term === undefined) {
        this.filterByFactions = this.transformers.filter(filtered =>
          filtered.faction === '0');
        return Array.from(new Set(this.filterByFactions));
      } else if(selectedFaction === 'Decepticons' && term === undefined) {
        this.filterByFactions = this.transformers.filter(filtered =>
          filtered.faction === '1');
          return Array.from(new Set(this.filterByFactions));
      } else if(term !== undefined && selectedFaction === '-') {
        this.newTransf = this.transformers.filter(filteredTransformers => {
          return filteredTransformers.name.toLowerCase()
            .includes(term.toLowerCase());
        });
        return Array.from(new Set(this.newTransf));
      } else if(term !== undefined && selectedFaction === 'Autobots') {
        this.filterByFactions = this.transformers.filter(filtered =>
          filtered.faction === '0');
        this.newTransf = this.filterByFactions.filter(filteredTransformers => {
          return filteredTransformers.name.toLowerCase()
            .includes(term.toLowerCase());
        });
        return Array.from(new Set(this.newTransf));
      } else if(term !== undefined && selectedFaction === 'Decepticons') {
        this.filterByFactions = this.transformers.filter(filtered =>
          filtered.faction === '1');
        this.newTransf = this.filterByFactions.filter(filteredTransformers => {
          return filteredTransformers.name.toLowerCase()
            .includes(term.toLowerCase());
        });
        return Array.from(new Set(this.newTransf));
      }
    } else if(selectedFaction === undefined && term !== undefined) {
      this.newTransf = this.transformers.filter(filteredTransformers => {
        return filteredTransformers.name.toLowerCase()
          .includes(term.toLowerCase());
      });
      return Array.from(new Set(this.newTransf));
    }
  }

  /*filterByFactions(selectedFaction: string): Transformer[] {

  }*/

  resetFilter(): void {
    this.getTransformers();
  }

  onSelect(transformer: Transformer): void {
    if(this.selectedTransformer === transformer) {
      this.selectedTransformer = null;
    } else {
      this.selectedTransformer = transformer;
    }
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTransformer.id]);
  }
}