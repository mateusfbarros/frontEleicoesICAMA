import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Calcme } from "src/app/models/calcme";
import { CalcmeService } from "src/app/services/calcme.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  public campo1 = "";
  public campo2 = "";

  list: Calcme[] = [];
  verificaVoto: boolean = false;

  calcme: Calcme = {
    matricula: "",
    candidato: "",
    telefone: "",
  };

  public candidatos = [
    {
      nome: "Chico",
      numero: "1",
      foto: "assets/img/download.png",
    },
    {
      nome: "Wagnão",
      numero: "2",
      foto: "assets/img/download2.png",
    },
    {
      nome: "Lucão",
      numero: "3",
      foto: "assets/img/download.png",
    },
  ];

  constructor(private router: Router, private service: CalcmeService) {}

  ngOnInit(): void {}

  create(): void {
    if (this.calcme.matricula == "") {
      this.service.message("Campo matrícula é obrigatório!");
    } else if (this.calcme.candidato == "") {
      this.service.message("O número do candidato é obrigatório!");
    } else {
      this.service.create(this.calcme).subscribe(
        () => {
          this.service.message("Voto registrado com sucesso!");
          this.router.navigate(["listAll"]);
        },
        (error) => {
          console.log(error);
          this.service.message("Erro ao votar!");
        }
      );
    }
  }

  verificaVotoExistente() {
    this.service.findAll().subscribe(
      (resposta) => {
        this.list = resposta;
        this.list.forEach((voto) => {
          if (voto.matricula === this.calcme.matricula) {
            this.verificaVoto = true;
          }
        });
        if (this.verificaVoto == true) {
          this.service.message(
            "O candidato com a matrícula " +
              this.calcme.matricula +
              " já votou!"
          );
          this.verificaVoto = false;
        } else {
          this.create();
        }
      },
      (error) => {
        console.error(error);
        this.service.message(error);
      }
    );
  }

  listagem(): void {
    this.router.navigate(["listAll"]);
  }

  inserir(valor: any) {
    let existeNumero = this.candidatos.find((item) => item.numero == valor);

    if (existeNumero != undefined) {
      this.campo1 = valor;
      this.calcme.candidato = this.campo1;
    } else {
      this.campo1 = "";
      this.service.message("Número não existe");
    }
  }

  corrige() {
    this.campo1 = "";
    this.campo2 = "";
    this.calcme.candidato = "";
  }
}
