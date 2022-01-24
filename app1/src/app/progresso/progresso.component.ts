import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.css'],
})
export class ProgressoComponent implements OnInit {
  //para deixar este conteúdo disponível para outro componente usar o decorator @Input
  @Input() public progresso: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
