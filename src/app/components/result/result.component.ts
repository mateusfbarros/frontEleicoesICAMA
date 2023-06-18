import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Calcme } from "src/app/models/calcme";
import { CalcmeService } from "src/app/services/calcme.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"],
})
export class ResultComponent implements OnInit {
  public candidatos: any = [];

  list: Calcme[] = [];
  votos1: number = 0;
  votos2: number = 0;
  votos3: number = 0;

  constructor(private router: Router, private service: CalcmeService) {}

  ngOnInit(): void {
    this.listaVotos();
  }

  cadastrar(): void {
    this.router.navigate([""]);
  }

  listaVotos() {
    this.service.findAll().subscribe(
      (resposta) => {
        this.list = resposta;
        this.votos1 = this.list.filter((voto) => voto.candidato == "1").length;
        this.votos2 = this.list.filter((voto) => voto.candidato == "2").length;
        this.votos3 = this.list.filter((voto) => voto.candidato == "3").length;

        this.candidatos = [
          {
            nome: "Chico",
            numero: "1",
            foto: "assets/img/download.png",
            votos: this.votos1,
          },
          {
            nome: "Wagnão",
            numero: "2",
            foto: "assets/img/download2.png",
            votos: this.votos2,
          },
          {
            nome: "Lucão",
            numero: "3",
            foto: "assets/img/download.png",
            votos: this.votos3,
          },
        ];
      },
      (error) => {
        console.error(error);
        this.service.message(error);
      }
    );
  }
}
