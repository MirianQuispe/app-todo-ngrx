import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filtro/filtro.actions';
import * as actionsTodo from '../../todos/todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual : actions.filtrosValidos = 'todos';
  filtros : actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes : number = 0;
  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    /* this.store.select('filtro')
      .subscribe( filtro => this.filtroActual = filtro ); */
      this.store.subscribe(
        state =>{
          this.filtroActual = state.filtro;
          this.pendientes = state.todos.filter( todo => todo.completado == false).length;
        }
      );
  }
  cambiarFiltro(_filtro: actions.filtrosValidos){
    this.filtroActual = _filtro;
    this.store.dispatch(actions.setFiltro({
      filtro: this.filtroActual
    }))
  }

  clearCompletadas(){
    this.store.dispatch(actionsTodo.limpiarTodos());
  }
}
