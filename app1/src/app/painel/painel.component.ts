import { ToastrService } from 'ngx-toastr';
import { FRASES } from './frases-mock';
import { Frase } from './../shared/frase.model';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit {
  public frases: Frase[] = FRASES;
  public resposta: string = '';
  public instrucao: string = 'Traduza a frase: ';

  public rodada: number = 0;
  public rodadaFrase!: Frase;

  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor(private toastr: ToastrService) {
    this.atualizaRodada();
    // this.rodadaFrase = this.frases[this.rodada];
    // console.log(this.frases);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // console.log('painel destruido');
  }

  //sempre colocar o operador de visibilidade do método ex:public
  public atualizaResposta(resposta: Event): void {
    //HTMLInputElement para acessar a propriedade
    this.resposta = (<HTMLInputElement>resposta.target).value;
    // console.log(this.resposta);
  }

  public verificarResposta(): void {
    // console.log('verificar resposta' + this.resposta);

    if (this.rodadaFrase.frasePtBr == this.resposta) {
      // alert('A tradução está correta');

      //iterando variável rodada trocando a frase da rodadaFrase
      this.rodada++;

      //iterar a variável progresso para mover a barra de acertos
      this.progresso = this.progresso + 100 / this.frases.length;

      if (this.rodada < 4) {
        // alert('Você acertou tudo! Parabéns!!! :D');
        //alert com ngx-toastr
        this.toastr.success('A tradução está CORRETA. Parabéns!');
      } else {
        this.encerrarJogo.emit('vitoria');
      }

      // console.log(this.progresso);

      // console.log(this.rodada);

      //ATUALIZA O OBJETO RODADA FRASE
      this.atualizaRodada();

      //limpar a mensagem anterior fornecida pelo usuário para
    } else {
      // alert('A tradução está INCORRETA');
      //decrementar a variavel tentativas
      this.tentativas--;

      if (this.tentativas > -1) {
        // alert('Você esgotou suas tentativas :´(');

        //alert com ngx-toastr
        this.toastr.warning('A tradução está INCORRETA.');
      } else {
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  // atualiza o objeto rodadaFrase
  public atualizaRodada(): void {
    //define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada];

    //limpar a resposta anterior fornecida pelo usuário
    this.resposta = '';
  }
}
