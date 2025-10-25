import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TransaccionesComponent } from './views/transacciones/transacciones.component';
import { ConversorComponent } from './views/conversor/conversor.component';
import { AnalisisComponent } from './views/analisis/analisis.component';
import { ConfiguracionComponent } from './views/configuracion/configuracion.component';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'conversor', component: ConversorComponent },
  { path: 'analisis', component: AnalisisComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
