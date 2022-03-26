import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response.model';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string;
  public games: Array<Game>;
  private gameSub: Subscription;
  private routeSub: Subscription;

  constructor(
    private httpService: HttpService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { 

  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>{
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }else{
        this.searchGames('meatcrit');
      }
    });
    
    
  }

  searchGames(sort: string, search?: string) {
    this.gameSub = this.httpService.getGameList(sort, search).subscribe((gameList:APIResponse<Game>)=>{
      this.games = gameList.results;
    });
  }

  openGameDetails(id: string){
    this.router.navigate(['details', id]);
  }

  ngOnDestroy() {
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }

    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
