import { Component, OnInit } from "@angular/core";
import { Calcme } from "src/app/models/calcme";
import { Router } from "@angular/router";
import { CalcmeService } from "src/app/services/calcme.service";

@Component({
  selector: "app-read-all",
  templateUrl: "./read-all.component.html",
  styleUrls: ["./read-all.component.css"],
})
export class ReadAllComponent implements OnInit {
  list: Calcme[] = [];

  constructor(private service: CalcmeService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todo) => {
        this.list.push(todo);
      });
    });
  }
  cadastrar(): void {
    this.router.navigate([""]);
  }
  verResultado(): void {
    this.router.navigate(["result"]);
  }

  deletar(id: any) {
    this.service.delete(id).subscribe(
      (res) => {
        if (res === null) {
          this.service.message("Registro excluído!");
          this.list = this.list.filter((item) => item.id !== id);
        }
      },
      (error) => {
        this.service.message("Erro ao tentar excluir registro!");
        console.log(error);
      }
    );
  }
}
